(() => {
  const storageKey = "jbrunoo-site-language";
  const supported = new Set(["ko", "en"]);

  const getInitialLanguage = () => {
    const saved = window.localStorage.getItem(storageKey);
    if (supported.has(saved)) return saved;
    return "ko";
  };

  const applyLanguage = (language) => {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n-ko][data-i18n-en]").forEach((node) => {
      node.textContent = node.dataset[`i18n${language === "ko" ? "Ko" : "En"}`];
    });

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.textContent = language === "ko" ? "English" : "한국어";
      button.setAttribute(
        "aria-label",
        language === "ko" ? "Switch language to English" : "언어를 한국어로 변경"
      );
    });

    window.localStorage.setItem(storageKey, language);
  };

  const initialLanguage = getInitialLanguage();
  applyLanguage(initialLanguage);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = document.documentElement.lang === "ko" ? "en" : "ko";
      applyLanguage(nextLanguage);
    });
  });
})();
