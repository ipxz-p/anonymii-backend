from datetime import datetime, timedelta

# กำหนดวันที่ปัจจุบัน
current_date = datetime(2024, 3, 1)

# คำนวณวันที่อีก 20 วัน
result_date = current_date + timedelta(days=31)

# แสดงผลลัพธ์
print("วันที่อีก 20 วันจะเป็น:", result_date.strftime("%Y-%m-%d"))