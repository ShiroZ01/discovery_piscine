const MIN_SIZE = 200;
const MAX_SIZE = 420; 
const CLICK_STEP = 10;
const LEAVE_STEP = 5;

const colors = ["red", "green", "blue"];
let colorIndex = 0;

let size = MIN_SIZE;

const balloon = document.getElementById("balloon");

function applyStyle() {
  balloon.style.width = size + "px";
  balloon.style.height = size + "px";
  balloon.style.backgroundColor = colors[colorIndex];
  balloon.style.borderRadius = "50%";
}

applyStyle();

balloon.addEventListener("click", () => {
  size += CLICK_STEP;
  colorIndex = (colorIndex + 1) % colors.length;

  if (size > MAX_SIZE) {
    size = MIN_SIZE;
    colorIndex = 0; 
  }
  applyStyle();
});

balloon.addEventListener("mouseleave", () => {
  size = Math.max(MIN_SIZE, size - LEAVE_STEP);
  colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  applyStyle();
});

balloon.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    balloon.click();
  }
});