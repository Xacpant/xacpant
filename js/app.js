(function () {
  const OWNER = "yusuf9847748-cyber";
  const REPO = "xacpant";
  const API = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;

  const i18n = {
    tr: {
      nav_home: "Ana sayfa",
      nav_firmware: "Firmware",
      nav_features: "Özellikler",
      nav_docs: "Doküman",
      nav_credit: "Credit",
      eyebrow: "LilyGO T-Embed CC1101 Plus",
      lede: "T-Embed CC1101 Plus için optimize edilmiş firmware. Resmi indirmeler, sürüm notları ve kaynak — tek yerde.",
      cta_download: "Firmware indir",
      cta_github: "GitHub",
      fw_title: "Firmware",
      fw_desc: "En son sürümü GitHub Releases üzerinden yayınlıyoruz. Aşağıdaki buton otomatik olarak son release’e bağlanır.",
      fw_latest: "Son sürüm",
      fw_open: "Releases’i aç",
      fw_loading: "Sürüm bilgisi yükleniyor…",
      fw_none: "Henüz release yok. İlk sürüm yayınlanınca burada görünecek.",
      fw_error: "Sürüm bilgisi alınamadı. Releases sayfasını açabilirsin.",
      fw_download: "İndir",
      feat_title: "Özellikler",
      f1_t: "Board odaklı",
      f1_d: "T-Embed CC1101 Plus donanımına göre temizlenmiş menü; olmayan özellikler yok.",
      f2_t: "OTA güncelleme",
      f2_d: "Wi‑Fi üzerinden GitHub’dan güncelle — PC’ye takmak zorunlu değil.",
      f3_t: "Kablosuz dosya",
      f3_d: "Telefon tarayıcısı ve bulut yolu ile USB’siz dosya aktarımı.",
      f4_t: "Performans",
      f4_d: "Akıcı UI, kararlı RF/NFC/nRF24 yolları, donma ve çökme odaklı sertleştirme.",
      docs_title: "Doküman",
      d1: "Son firmware’i Releases’ten indir.",
      d2: "İlk kurulumda USB ile flash et (veya mevcut OTA yolunu kullan).",
      d3: "Wi‑Fi ayarla; sonraki güncellemeler Ayarlar → Güncelle ile gelir.",
      docs_note: "Detaylı kurulum notları repo README içinde güncellenir.",
      credit_title: "Credit",
      credit_body: "Xacpant, Bruce firmware’den esinlenen bir fork’tur. Bruce projesine ve katkıda bulunanlara teşekkürler. Bu site ve marka Xacpant’a aittir.",
    },
    en: {
      nav_home: "Home",
      nav_firmware: "Firmware",
      nav_features: "Features",
      nav_docs: "Docs",
      nav_credit: "Credit",
      eyebrow: "LilyGO T-Embed CC1101 Plus",
      lede: "Firmware optimized for the T-Embed CC1101 Plus. Official downloads, release notes, and source — in one place.",
      cta_download: "Download firmware",
      cta_github: "GitHub",
      fw_title: "Firmware",
      fw_desc: "We ship the latest build via GitHub Releases. The button below tracks the newest release automatically.",
      fw_latest: "Latest release",
      fw_open: "Open Releases",
      fw_loading: "Loading release info…",
      fw_none: "No release yet. It will appear here after the first publish.",
      fw_error: "Could not load release info. You can open the Releases page.",
      fw_download: "Download",
      feat_title: "Features",
      f1_t: "Board-focused",
      f1_d: "Menus cleaned for T-Embed CC1101 Plus hardware — no phantom features.",
      f2_t: "OTA updates",
      f2_d: "Update from GitHub over Wi‑Fi — no PC required every time.",
      f3_t: "Wireless files",
      f3_d: "Phone browser and cloud path for file transfer without USB.",
      f4_t: "Performance",
      f4_d: "Snappy UI, solid RF/NFC/nRF24 paths, hardened against freezes and crashes.",
      docs_title: "Docs",
      d1: "Download the latest firmware from Releases.",
      d2: "Flash over USB for the first install (or use an existing OTA path).",
      d3: "Set Wi‑Fi; later updates come from Settings → Update.",
      docs_note: "Detailed flash notes live in the repository README.",
      credit_title: "Credit",
      credit_body: "Xacpant is a fork inspired by Bruce firmware. Thanks to the Bruce project and its contributors. This site and brand belong to Xacpant.",
    },
  };

  let lang = localStorage.getItem("xacpant-lang") || "tr";

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.getElementById("lang-tr").classList.toggle("active", lang === "tr");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");
  }

  document.getElementById("lang-tr").addEventListener("click", () => {
    lang = "tr";
    localStorage.setItem("xacpant-lang", lang);
    applyLang();
    loadRelease();
  });
  document.getElementById("lang-en").addEventListener("click", () => {
    lang = "en";
    localStorage.setItem("xacpant-lang", lang);
    applyLang();
    loadRelease();
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  applyLang();

  async function loadRelease() {
    const status = document.getElementById("release-status");
    const tag = document.getElementById("release-tag");
    const name = document.getElementById("release-name");
    const btn = document.getElementById("release-download");
    const heroBtn = document.getElementById("download-btn");
    status.textContent = i18n[lang].fw_loading;

    try {
      const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
      if (res.status === 404) {
        tag.textContent = "—";
        name.textContent = "";
        status.textContent = i18n[lang].fw_none;
        const url = `https://github.com/${OWNER}/${REPO}/releases`;
        btn.href = url;
        heroBtn.href = url;
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      tag.textContent = data.tag_name || "—";
      name.textContent = data.name && data.name !== data.tag_name ? data.name : "";
      const asset =
        (data.assets || []).find((a) => /\.(bin|zip)$/i.test(a.name)) ||
        (data.assets || [])[0];
      const url = asset ? asset.browser_download_url : data.html_url;
      btn.href = url;
      btn.textContent = asset ? i18n[lang].fw_download : i18n[lang].fw_open;
      heroBtn.href = url;
      status.textContent = data.published_at
        ? new Date(data.published_at).toLocaleString(lang === "tr" ? "tr-TR" : "en-US")
        : "";
    } catch (e) {
      tag.textContent = "—";
      status.textContent = i18n[lang].fw_error;
      const url = `https://github.com/${OWNER}/${REPO}/releases`;
      btn.href = url;
      heroBtn.href = url;
    }
  }

  loadRelease();
})();
