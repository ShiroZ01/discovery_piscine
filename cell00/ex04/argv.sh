#!/bin/bash

# ตรวจสอบว่าจำนวน arguments ($#) เท่ากับ 0 หรือไม่
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # ถ้ามี arguments ให้เริ่มวนลูป
    count=0
    for arg in "$@"; do
        # แสดงผลสูงสุดแค่ 3 ตัว
        if [ $count -lt 3 ]; then
            echo "$arg"
            count=$((count + 1))
        fi
    done
fi

