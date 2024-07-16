package com.sehee.goaltrackerreact.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface CategoryDao {
    @Query("SELECT * FROM Category")
    fun getAll(): List<Category>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(newCategory: Category)

    @Query("DELETE FROM Category WHERE id = :id")
    fun deleteUserById(id: Int)

    @Query("UPDATE Category SET visibility = :v  WHERE id =:id ")
    fun updateVisibility(id: Int, v: Boolean)

    @Query("UPDATE Category SET name = :name  WHERE id =:id ")
    fun updateName(id: Int, name: String)
}