package com.sehee.goaltrackerreact

import android.app.Activity
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.sehee.goaltrackerreact.database.Category
import com.sehee.goaltrackerreact.database.GoalDatabase
import com.sehee.goaltrackerreact.database.IsChecked
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject


class WebBridge(private val context: Context, private val webView: WebView) {

    private lateinit var db: GoalDatabase

    init {
        db = GoalDatabase.getInstance(context)!!
        CoroutineScope(Dispatchers.IO).launch {
            //check first run, put some sample data
            val pref: SharedPreferences =
                context.getSharedPreferences("isFirst", Activity.MODE_PRIVATE)
            val first = pref.getBoolean("isFirst", false)
            if (first == false) {
                Log.d("It's First Run", "first")
                val editor = pref.edit()
                editor.putBoolean("isFirst", true)
                editor.commit()

                db.categoryDao().insert(Category(start_date = "2024-02-25", name = "Study"))
                //db.categoryDao().insert(Category(start_date = "2024-03-10", name="Second"))
                //db.categoryDao().insert(Category(start_date = "2024-03-20", name="Third"))
                db.checkDao().insert(IsChecked(date = "2024-05-08", categoryId = 1))
            }
        }
    }

    @JavascriptInterface
    public fun logAndroid(log: String){
        Log.d(javaClass.name, log)
    }


    @JavascriptInterface
    public fun addCategoryData(start_date: String, name: String) {
        Log.d(javaClass.name, "addCategoryData in android")
        CoroutineScope(Dispatchers.IO).launch {
            db.categoryDao().insert(Category(start_date = start_date, name=name))
        }
    }

    @JavascriptInterface
    public fun deleteCategoryData(id: Int){
        CoroutineScope(Dispatchers.IO).launch {
            db.categoryDao().deleteUserById(id)
            db.checkDao().deleteCheckByCategoryId(id)
        }
    }

    @JavascriptInterface
    public fun loadCategoryList(){
        CoroutineScope(Dispatchers.Main).launch {
            val categoryList = CoroutineScope(Dispatchers.IO).async {
                db.categoryDao().getAll()
            }.await()
        }
    }

    @JavascriptInterface
    public fun addIsCheckData(date: String, categoryId: Int){
        CoroutineScope(Dispatchers.IO).launch {
            db.checkDao().insert(IsChecked(date = date, categoryId = categoryId))
        }
    }

    @JavascriptInterface
    public fun deleteIsCheckData(id: Int){
        CoroutineScope(Dispatchers.IO).launch {
            db.checkDao().deleteCheckById(id)
        }
    }

    @JavascriptInterface
    public fun loadCheckList(){
        var checkList: List<IsChecked>
        CoroutineScope(Dispatchers.Main).launch {
            checkList = CoroutineScope(Dispatchers.IO).async {
                db.checkDao().getAll()
            }.await()

            val toJson = checklistToJson(checkList).toString()

            Log.d(javaClass.name, toJson)
            webView.evaluateJavascript(
                    publishEvent(
                        "loadCheckListToWeb",
                        toJson
                    )
                ) { result: String? ->
                }
        }
    }
    @JavascriptInterface
    public fun loadCategory(){
        Log.d(javaClass.name, "loadCategory")
        var categoryList: List<Category>
        CoroutineScope(Dispatchers.Main).launch {
            categoryList = CoroutineScope(Dispatchers.IO).async {
                db.categoryDao().getAll()
            }.await()

            val toJson = categoryToJson(categoryList).toString()

            Log.d(javaClass.name, "loadCategory")
            Log.d(javaClass.name, toJson)

            webView.evaluateJavascript(
                publishEvent(
                    "loadCategoryToWeb",
                    toJson
                )
            ) { result: String? ->
            }
        }
    }

    private fun publishEvent(functionName: String, data: String): String {
        val buffer = StringBuffer()
            .append("window.dispatchEvent(\n")
            .append("   new CustomEvent(\"").append(functionName).append("\", {\n")
            .append("           detail: {\n")
            .append("               data: ").append(data).append("\n")
            .append("           }\n")
            .append("       }\n")
            .append("   )\n")
            .append(");")
        return buffer.toString()
    }

    private fun checklistToJson(list: List<IsChecked>): JSONArray{
        val returnJson = JSONArray()

        for (i in 0..list.size-1){
            val addedItem = JSONObject()
            addedItem.put("id", list.get(i).id)
            addedItem.put("date", list.get(i).date)
            addedItem.put("categoryId", list.get(i).categoryId)

            returnJson.put(addedItem)
        }

        return returnJson
    }

    private fun categoryToJson(list: List<Category>): JSONArray{
        val returnJson = JSONArray()

        for (i in 0..list.size-1){
            val addedItem = JSONObject()
            addedItem.put("id", list.get(i).id)
            addedItem.put("start_date", list.get(i).start_date)
            addedItem.put("name", list.get(i).name)

            returnJson.put(addedItem)
        }

        return returnJson
    }

}