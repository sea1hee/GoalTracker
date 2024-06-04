package com.sehee.goaltrackerreact.database

import androidx.room.*

@Dao
interface CategoryDao {
    @Query("SELECT * FROM Category")
    fun getAll(): List<Category>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(newCategory: Category)

    @Query("DELETE FROM Category WHERE id = :id")
    fun deleteUserById(id: Int)
}