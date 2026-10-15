// ===== Júlia Beatriz Beauty — scripts =====
var WHATSAPP = "5581997191301";

// Monta os links do WhatsApp com a mensagem de cada botão (atributo data-msg)
function linkWhats(msg){
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
}
document.querySelectorAll("[data-msg]").forEach(function(a){
  a.href = linkWhats(a.dataset.msg);
  a.target = "_blank";
  a.rel = "noopener";
});

// Cabeçalho fica sólido ao rolar
var hd = document.querySelector(".hd");
var wa = document.querySelector(".wa");
var finalCta = document.querySelector(".cta");
function onScroll(){
  hd.classList.toggle("solid", window.scrollY > 40);
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

// Esconde o botão flutuante quando a chamada final está na tela (evita botão duplicado)
if (wa && finalCta && "IntersectionObserver" in window){
  new IntersectionObserver(function(es){
    wa.classList.toggle("hide", es[0].isIntersecting);
  }, {threshold:.3}).observe(finalCta);
}

// "Ver mais serviços" de cada categoria
document.querySelectorAll("[data-more]").forEach(function(btn){
  var group = btn.closest(".group");
  var label = btn.querySelector("span");
  var closedText = label.textContent;
  btn.addEventListener("click", function(){
    var open = group.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    label.textContent = open ? "Mostrar menos" : closedText;
    if (!open) group.scrollIntoView({behavior:"smooth", block:"start"});
  });
});

// Fotos de cada serviço: se houver mais de uma, vira carrossel com bolinhas
document.querySelectorAll(".slides").forEach(function(sl){
  var imgs = sl.querySelectorAll("img");
  if (imgs.length < 2) return;
  var dots = document.createElement("div");
  dots.className = "dots";
  imgs.forEach(function(_, i){ dots.appendChild(document.createElement("i")); });
  var box = document.createElement("div");
  box.className = "photo";
  sl.parentNode.insertBefore(box, sl);
  box.appendChild(sl);
  box.appendChild(dots);
  function mark(){
    var i = Math.round(sl.scrollLeft / sl.clientWidth);
    dots.querySelectorAll("i").forEach(function(d, k){ d.classList.toggle("on", k === i); });
  }
  sl.addEventListener("scroll", mark, {passive:true});
  mark();
});
