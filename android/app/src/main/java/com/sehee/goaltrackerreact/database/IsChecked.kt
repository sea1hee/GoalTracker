package com.sehee.goaltrackerreact.database

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey
import java.util.Date

@Entity(
    tableName = "IsChecked",
    foreignKeys = arrayOf(
        ForeignKey(
            entity = Category::class,
            parentColumns = arrayOf("id"),
            childColumns = arrayOf("categoryId"),
            onDelete = ForeignKey.CASCADE
        )
    )
)
data class IsChecked(
    @PrimaryKey(autoGenerate = true)
    var id: Int = 0,
    var date: String,
    var categoryId: Int = 0
)