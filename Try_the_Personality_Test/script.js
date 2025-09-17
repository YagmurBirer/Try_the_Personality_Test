// script.js

const questions = [
  {
    q: "1. Yeni bir projeye başlarken nasıl bir yaklaşım sergilersin?",
    options: [
      { text: "Hemen adım atarım, planı zamanla oluştururum", type: "Lider" },
      { text: "Önce araştırırım ve detaylı plan yaparım", type: "Mantıkçı" },
      { text: "Farklı fikirler üretmeye odaklanırım", type: "Sanatçı" },
      { text: "Takım arkadaşlarıyla tartışıp fikir alırım", type: "Sosyal" }
    ]
  },
  {
    q: "2. Boş zamanında ne yapmayı seversin?",
    options: [
      { text: "Yeni bir beceri öğrenirim", type: "Mantıkçı" },
      { text: "Arkadaşlarımla dışarı çıkarım", type: "Sosyal" },
      { text: "Resim, müzik veya yazı ile uğraşırım", type: "Sanatçı" },
      { text: "Liderlik yapabileceğim bir etkinlikte rol alırım", type: "Lider" }
    ]
  },
  {
    q: "3. Grup çalışmasında rolün genellikle nedir?",
    options: [
      { text: "Herkesin işini koordine eden kişi", type: "Lider" },
      { text: "Fikirleri derleyip analiz eden kişi", type: "Mantıkçı" },
      { text: "İlginç fikirler ve yenilikler öneren", type: "Sanatçı" },
      { text: "İnsanları motive eden ve sosyal ortam yaratan", type: "Sosyal" }
    ]
  },
  {
    q: "4. Bir sorunu çözerken önceliğin nedir?",
    options: [
      { text: "Hızlı ve etkili çözüm bulmak", type: "Lider" },
      { text: "Mantıklı ve planlı bir çözüm üretmek", type: "Mantıkçı" },
      { text: "Yaratıcı ve farklı bir çözüm bulmak", type: "Sanatçı" },
      { text: "Ekip ile birlikte çözüm geliştirmek", type: "Sosyal" }
    ]
  },
  {
    q: "5. Yeni bir fikir ortaya attığında kendini nasıl hissedersin?",
    options: [
      { text: "Hemen harekete geçerim", type: "Lider" },
      { text: "Detayları planlarım", type: "Mantıkçı" },
      { text: "Fikirlerim ilginç ve sıra dışıdır", type: "Sanatçı" },
      { text: "İnsanlarla paylaşmak ve birlikte geliştirmek isterim", type: "Sosyal" }
    ]
  },
  {
    q: "6. Arkadaşların sana hangi konuda güvenir?",
    options: [
      { text: "Karar vermek ve liderlik yapmak", type: "Lider" },
      { text: "Analiz ve mantıklı çözümler üretmek", type: "Mantıkçı" },
      { text: "Yaratıcı fikirler ve estetik", type: "Sanatçı" },
      { text: "Sosyal iletişim ve moral vermek", type: "Sosyal" }
    ]
  },
  {
    q: "7. Yeni bir yere giderken yaklaşımın nasıl olur?",
    options: [
      { text: "Plan yapar ve liderlik ederim", type: "Lider" },
      { text: "Harita ve detaylı bilgi toplarım", type: "Mantıkçı" },
      { text: "İlginç yollar ve farklı deneyimler ararım", type: "Sanatçı" },
      { text: "Arkadaşlarımla beraber hareket ederim", type: "Sosyal" }
    ]
  },
  {
    q: "8. Bir görevde motivasyon kaynağın nedir?",
    options: [
      { text: "Başarı ve liderlik hissi", type: "Lider" },
      { text: "Başarı ve mükemmellik", type: "Mantıkçı" },
      { text: "Yaratıcı ve özgün bir şey başarmak", type: "Sanatçı" },
      { text: "Başkalarına yardımcı olmak ve birlikte başarmak", type: "Sosyal" }
    ]
  },
  {
    q: "9. Zor bir durumda tepkin nasıl olur?",
    options: [
      { text: "Hızlıca aksiyon alırım", type: "Lider" },
      { text: "Sorunu analiz ederim", type: "Mantıkçı" },
      { text: "Farklı çözüm yolları denerim", type: "Sanatçı" },
      { text: "İnsanları destekleyip birlikte çözüm buluruz", type: "Sosyal" }
    ]
  },
  {
    q: "10. Hayatını tanımlayan üç kelimeyi seç desek hangileri olur?",
    options: [
      { text: "Kararlı, cesur, güçlü", type: "Lider" },
      { text: "Planlı, düzenli, çalışkan", type: "Mantıkçı" },
      { text: "Hayalperest, yaratıcı, özgür", type: "Sanatçı" },
      { text: "Sosyal, neşeli, yardımsever", type: "Sosyal" }
    ]
  }
];

// Kategorilere puan tutacak obje
let scores = {
  "Lider": 0,
  "Sanatçı": 0,
  "Mantıkçı": 0,
  "Sosyal": 0
};

let currentQuestion = 0;

// Elementler
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const qcountEl = document.getElementById("qcount");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

// Soruyu ve seçenekleri göster
function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.q;
  qcountEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-ghost");
    btn.textContent = opt.text;
    btn.onclick = () => selectOption(opt.type);
    optionsEl.appendChild(btn);
  });

  prevBtn.disabled = currentQuestion === 0;
}

// Seçeneği işleme
function selectOption(type) {
  scores[type]++;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

// Sonucu göster
function showResult() {
  document.querySelector(".top-row").style.display = "none";
  document.querySelector(".question").style.display = "none";
  document.querySelector(".options").style.display = "none";
  document.querySelector(".controls").style.display = "none";
  resultEl.style.display = "flex";

  // En yüksek skoru bul
  let mainType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const descriptions = {
    "Lider": "Sen bir Lider’sin! Kararlı, girişken ve motivasyonlu bir kişiliğe sahipsin. Genellikle sorumluluk almayı seviyorsun ve insanları yönlendirmekten keyif alıyorsun.",
    "Sanatçı": "Sen bir Sanatçısın! Yaratıcı, hayalperest ve duygusal bir yapıya sahipsin. Farklı fikirler üretmekten ve kendini ifade etmekten hoşlanıyorsun.",
    "Mantıkçı": "Sen bir Mantıkçısın! Analitik, planlı ve çalışkan bir kişiliğe sahipsin. Problemleri çözmekte ve işleri düzenli yapmakta üstünsün.",
    "Sosyal": "Sen bir Sosyalsin! Neşeli, iletişimci ve yardımsever bir yapıya sahipsin. İnsanlarla vakit geçirmekten keyif alıyor ve enerjini etrafına yaymayı seviyorsun."
  };

  finalScoreEl.textContent = `${scores[mainType]} puan`;
  resultTitle.textContent = mainType;
  resultText.textContent = descriptions[mainType];
}

// Önceki soruya git
prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    // Önceki cevabı geri al
    // Basit yaklaşım: puanı sıfırlayarak değil, sadece ilerlemeyi geri al
    showQuestion();
  }
});

// restart kısmı
restartBtn.addEventListener("click", () => {
  scores = { "Lider":0,"Sanatçı":0,"Mantıkçı":0,"Sosyal":0 };
  currentQuestion = 0;
  resultEl.style.display = "none";
  document.querySelector(".top-row").style.display = "flex";
  document.querySelector(".question").style.display = "block";
  optionsEl.style.display = "grid"; // <-- burayı grid yap
  document.querySelector(".controls").style.display = "flex";
  showQuestion();
});


// Başlangıç
showQuestion();
