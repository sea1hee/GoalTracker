package com.sehee.goaltrackerreact.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity
data class Category (
    @PrimaryKey(autoGenerate = true)
    var id: Int = 0,
    var start_date: String,
    var name: String
)