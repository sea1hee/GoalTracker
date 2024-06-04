package com.sehee.goaltrackerreact.database


import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = arrayOf(Category::class, IsChecked::class), version = 1)
abstract class GoalDatabase: RoomDatabase() {
    abstract fun categoryDao(): CategoryDao
    abstract fun checkDao(): CheckDao

    companion object {
        private var instance: GoalDatabase? = null

        @Synchronized
        fun getInstance(context: Context): GoalDatabase? {
            if (instance == null) {
                synchronized(GoalDatabase::class){
                    instance = Room.databaseBuilder(
                        context.applicationContext,
                        GoalDatabase::class.java,
                        "goal-database"
                    )
                        .build()
                }
            }
            return instance
        }
    }
}