package com.sehee.goaltrackerreact.database

import androidx.room.*

@Dao
interface CheckDao {
    @Query("SELECT * FROM IsChecked")
    fun getAll(): List<IsChecked>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(check: IsChecked)

    @Query("DELETE FROM IsChecked WHERE id = :id")
    fun deleteCheckById(id: Int)

    @Query("DELETE FROM IsChecked WHERE categoryId = :categoryId")
    fun deleteCheckByCategoryId(categoryId: Int)
}