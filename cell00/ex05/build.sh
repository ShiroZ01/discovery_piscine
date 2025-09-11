#!/bin/bash

# ตรวจสอบว่ามี arguments ส่งเข้ามาหรือไม่ ($# คือจำนวน arguments)
if [ $# -eq 0 ]; then
    # ถ้าไม่มี ให้แสดงข้อความแล้วจบการทำงาน
    echo "No arguments supplied"
else
    # ถ้ามี ให้วนลูปทำงานกับ arguments ทั้งหมดที่ส่งเข้ามา ("$@")
    for arg in "$@"; do
        # สำหรับแต่ละ argument ให้สร้างโฟลเดอร์โดยเอา "ex" มาต่อหน้า
        mkdir "ex${arg}"
    done
fi
