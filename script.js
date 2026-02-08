// Сцены с текстом, временем появления и задержкой перед печатью
const scenes = [
  {
    time: 11,
    delay: 0,
    text: "Твои слезы смешались с моим дождем Не хочу быть один, я хочу быть вдвоем",
    img: 1,
  },
  {
    time: 17,
    delay: 0.4,
    text: "Не хочу быть собой, я хочу быть с тобой Я не чувствую боль, но я чувствую любовь",
    img: 2,
  },
  {
    time: 22,
    delay: 0.4,
    text: "Я ненавижу, когда снова К себе меня тянет чей-то город",
    img: 3,
  },
  {
    time: 28.5,
    delay: 0.4,
    text: "С нашей общей зоны комфорта Улетим туда, где мы будем в одних шортах",
    img: 4,
  },
  {
    time: 34,
    delay: 0.4,
    text: "Я так сильно хочу с тобой быть постоянно Назови смешным, назови меня странным",
    img: 5,
  },
  {
    time: 39,
    delay: 0.4,
    text: "Это все неважно: Гуччи или Прада Важно то, что я с тобой, важно то, что рядом",
    img: 6,
  },
  {
    time: 46,
    delay: 0.4,
    text: "Помню все слова, которые ты мне сказала Повторю свои, чтобы ты не забывала",
    img: 7,
  },
  {
    time: 51.5,
    delay: 0.4,
    text: "Я люблю тебя, хочу с тобой быть постоянно Назови смешным, назови меня странным",
    img: 8,
  },
  {
    time: 57.5,
    delay: 0.4,
    text: "Я хочу быть с тобой двадцать четыре на семь Каждую минуту и секунду, каждый день",
    img: 9,
  },
  {
    time: 63,
    delay: 0.3,
    text: "Чтобы каждый раз твоя рука в моей Твои губы на мои, а ты на мне",
    img: 10,
  },
  {
    time: 69,
    delay: 0.4,
    text: "И на то, что говорят они про нас, забей Ты на мне, губы на мои, рука в моей Каждую минуту и секунду, каждый день Я хочу быть с тобой двадцать четыре на семь",
    img: 11,
  },
];

const audio = document.getElementById("audio");
const photo = document.getElementById("photo");
const lyrics = document.getElementById("lyrics");
const playBtn = document.getElementById("play");
const volume = document.getElementById("volume");
const final = document.getElementById("final");

let index = 0;
let typingInterval = null;
let currentPhotoIndex = 1;

// Кнопка Play/Pause
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸ Pause";
  } else {
    audio.pause();
    playBtn.textContent = "▶ Play";
    clearInterval(typingInterval);
  }
};

// Регулятор громкости
volume.oninput = (e) => (audio.volume = e.target.value);

// Отслеживание времени песни
audio.addEventListener("timeupdate", () => {
  if (index >= scenes.length) return;

  if (audio.currentTime >= scenes[index].time) {
    showScene(scenes[index]);
    index++;
  }
});

// Печать текста с эффектом печатной машинки
function typeText(text, delay = 0) {
  clearInterval(typingInterval);

  // Сначала скрываем текст
  lyrics.classList.remove("show");
  lyrics.textContent = "";

  // Задержка перед началом печати
  setTimeout(() => {
    lyrics.classList.add("show");

    let i = 0;
    const speed = 55; // скорость печати (мс на символ)

    typingInterval = setInterval(() => {
      if (audio.paused) {
        clearInterval(typingInterval);
        return;
      }

      if (i < text.length) {
        lyrics.textContent += text[i];
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
  }, delay * 1000);
}

// Плавная смена фото
function changePhoto(imgNum) {
  if (imgNum === currentPhotoIndex) return;

  // Плавное исчезновение
  photo.classList.add("fade-out");

  setTimeout(() => {
    photo.src = `img/${imgNum}.jpg`;
    currentPhotoIndex = imgNum;

    // Ждем загрузки фото чтобы определить ориентацию
    photo.onload = function () {
      const card = document.querySelector(".card");
      const isVertical = this.naturalHeight > this.naturalWidth;
      const isMobile = window.innerWidth < 768;

      if (isVertical) {
        // Вертикальное фото
        if (isMobile) {
          card.style.width = "auto";
          card.style.height = "60vh";
          card.style.maxWidth = "95vw";
        } else {
          card.style.width = "auto";
          card.style.height = "80vh";
          card.style.maxWidth = "600px";
        }
      } else {
        // Горизонтальное фото
        if (isMobile) {
          card.style.width = "95vw";
          card.style.height = "auto";
          card.style.maxWidth = "95vw";
          card.style.maxHeight = "60vh";
        } else {
          card.style.width = "65vw";
          card.style.height = "auto";
          card.style.maxWidth = "850px";
          card.style.maxHeight = "70vh";
        }
      }

      // Плавное появление
      setTimeout(() => {
        photo.classList.remove("fade-out");
        photo.classList.add("fade-in");

        setTimeout(() => {
          photo.classList.remove("fade-in");
        }, 1000);
      }, 50);
    };
  }, 500);
}

// Показ сцены
function showScene(scene) {
  changePhoto(scene.img);
  typeText(scene.text, scene.delay);
  // Убрали spawnHearts() - сердечки не появляются при перелистывании
}

// Генерация сердечек
function spawnHearts() {
  const heartsContainer = document.getElementById("hearts");
  const heartCount = window.innerWidth < 768 ? 3 : 5; // меньше сердец на мобильных

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 12 + Math.random() * 20 + "px";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";

      heartsContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }, i * 200);
  }
}

// Финальный экран
audio.addEventListener("ended", () => {
  lyrics.classList.remove("show");

  setTimeout(() => {
    final.classList.add("show");

    // Финальный салют из сердец
    for (let i = 0; i < 20; i++) {
      setTimeout(() => spawnHearts(), i * 150);
    }
  }, 1000);
});

// Предзагрузка картинок для плавных переходов
window.addEventListener("load", () => {
  scenes.forEach((scene) => {
    const img = new Image();
    img.src = `img/${scene.img}.jpg`;
  });
});

// Обработка ошибок при загрузке стикеров (если их нет)
// ЗАМЕНЕНО НА: Инициализация смайликов на фоне

const emojiStickers = [
  "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "💘",
  "💞",
  "💌",
  "🌸",
  "🌺",
  "🌹",
  "🌷",
  "🌼",
  "🦋",
  "✨",
  "💫",
  "⭐",
  "🌙",
  "🎀",
  "🎁",
  "💐",
  "🌟",
];

function initBackgroundStickers() {
  const stickersContainer = document.getElementById("stickers");
  const stickerCount = window.innerWidth < 768 ? 8 : 15; // Меньше на мобильных

  for (let i = 0; i < stickerCount; i++) {
    const sticker = document.createElement("div");
    sticker.className = "sticker";
    sticker.innerHTML =
      emojiStickers[Math.floor(Math.random() * emojiStickers.length)];

    // Случайное положение
    sticker.style.left = Math.random() * 100 + "%";
    sticker.style.top = Math.random() * 100 + "%";
    sticker.style.fontSize = 25 + Math.random() * 35 + "px";
    sticker.style.animationDelay = Math.random() * 12 + "s";
    sticker.style.animationDuration = 10 + Math.random() * 8 + "s";

    stickersContainer.appendChild(sticker);
  }
}

// Инициализация стикеров при загрузке
initBackgroundStickers();
