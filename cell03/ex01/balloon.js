const balloon = document.getElementById("balloon");

let size = 200;
const minSize = 200;
const maxSize = 420;
const colors = ["red", "green", "blue"];
let colorIndex = 0;

// คลิก = ขยาย + เปลี่ยนสีเดินหน้า
balloon.addEventListener("click", () => {
  size += 10;
  if (size > maxSize) {
    size = minSize;
    colorIndex = 0;
  } else {
    colorIndex = (colorIndex + 1) % colors.length;
  }
  updateBalloon();
});

// เมาส์ออก = หด + เปลี่ยนสีถอยหลัง
balloon.addEventListener("mouseleave", () => {
  if (size > minSize) {
    size -= 5;
  }
  colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  updateBalloon();
});

// ฟังก์ชันอัปเดตบอลลูน
function updateBalloon() {
  balloon.style.width = size + "px";
  balloon.style.height = size + "px";
  balloon.style.backgroundColor = colors[colorIndex];
}
