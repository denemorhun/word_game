import i18next from "i18next";

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: "en",
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        main: {
          title1: "GAME OF",
          title2: "LETTERS",
          subtitle: "A Game to Master the Letters",
          start: "Start Game"
        },
        start: {
          find: "Find the letter",
          level: "Level:",
          score: "Score:"
        },
        encouragements: {
          0: "FANTASTIC",
          1: "KEEP IT UP",
          2: "AMAZING",
          3: "GREAT WORK",
          4: "GOOD JOB",
          5: "NICE",
          6: "UNBELIEVABLE",
          7: "INCREDIBLE",
          8: "AWESOME"
        },
        gameOver: {
          tryAgain: "Please Try Again",
          ok: "OK"
        }
      }
    },
    tr: {
      translation: {
        main: {
          title1: "HARF",
          title2: "OYUNLAR",
          subtitle: "Harfleri öğrenmek için bir oyun",
          start: "BAŞLAT"
        },
        start: {
          find: "Harfini bul",
          level: "Seviye:",
          score: "Skor:"
        },
        encouragements: {
          0: "FANTASTİK",
          1: "AYNEN BÖYLE DEVAM",
          2: "İNANILMAZ",
          3: "HARİKA İŞ",
          4: "AFERİN",
          5: "GÜZEL",
          6: "HARIKA",
          7: "İNANILMAZ",
          8: "OLAĞANÜSTÜ"
        },
        gameOver: {
          tryAgain: "Lütfen tekrar deneyin",
          ok: "Tamam"
        }
      }
    }
  }
});

export default i18next;
