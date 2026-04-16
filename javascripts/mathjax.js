window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true,
    macros: {
      ket: ["|#1\\rangle", 1],
      bra: ["\\langle #1|", 1],
      braket: ["\\langle #1|#2\\rangle", 2],
      ketbra: ["|#1\\rangle\\langle #2|", 2],
      expect: ["\\langle #1 \\rangle", 1],
      norm: ["\\|#1\\|", 1],
      Tr: ["\\mathrm{Tr}"],
      id: ["\\mathbb{I}"],
    }
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => {
  MathJax.startup.output.clearCache();
  MathJax.typesetClear();
  MathJax.texReset();
  MathJax.typesetPromise();
});
