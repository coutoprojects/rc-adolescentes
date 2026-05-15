import { useState, useEffect, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "./supabase";

/* ─────────────────────────────────────────────
   AURA BACKGROUND — totalmente visível, cinematográfico
   Fiel à imagem enviada: cream + azul + vermelho
───────────────────────────────────────────── */
function AuraBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <style>{`
       @keyframes float1 {
  0%   { transform: translate(0px, 0px) scale(1); }
  25%  { transform: translate(80px, -30px) scale(1.08); }
  50%  { transform: translate(120px, 20px) scale(1.05); }
  75%  { transform: translate(60px, 40px) scale(1.10); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float2 {
  0%   { transform: translate(0px, 0px) scale(1); }
  25%  { transform: translate(-120px, 20px) scale(1.08); }
  50%  { transform: translate(-160px, -30px) scale(1.05); }
  75%  { transform: translate(-90px, -40px) scale(1.10); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes b4 {
  0%   { transform: translate(0px, 0px) scale(1); }
  25%  { transform: translate(90px, 30px) scale(1.10); }
  50%  { transform: translate(130px, -20px) scale(1.06); }
  75%  { transform: translate(70px, -40px) scale(1.08); }
  100% { transform: translate(0px, 0px) scale(1); }
}
        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-1%,1%); }
        }
        
      `}</style>

    
      {/* FUNDO BASE */}
<div style={{
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, #901808 0%, #C02818 25%, #C02818 35%, #1428A0 45%, #1E3EC0 55%, #1428A0 80%)",
}} />

{/* AZUL TOPO DIREITA */}
<div style={{
  position: "absolute",
  width: "130vw", height: "130vw",
  borderRadius: "50%",
  top: "-35%", right: "-45%",
  background: "radial-gradient(circle, #1E3EC0 0%, #1428A0 45%, transparent 60%)",
  opacity: 0.90,
  animation: "float2 36s ease-in-out infinite",
}} />

{/* AZUL CENTRO DIREITA */}
<div style={{
  position: "absolute",
  width: "120vw", height: "120vw",
  borderRadius: "50%",
  top: "15%", right: "-50%",
  background: "radial-gradient(circle, #1E3EC0 0%, #1428A0 45%, transparent 60%)",
  opacity: 0.95,
  animation: "float2 24s ease-in-out infinite",
}} />

{/* AZUL BOTTOM DIREITA */}
<div style={{
  position: "absolute",
  width: "130vw", height: "130vw",
  borderRadius: "50%",
  bottom: "-35%", right: "-45%",
  background: "radial-gradient(circle, #1E3EC0 0%, #1428A0 45%, transparent 60%)",
  opacity: 0.90,
  animation: "float2 30s ease-in-out infinite",
}} />

{/* VERMELHO TOPO ESQUERDA */}
<div style={{
  position: "absolute",
  width: "120vw", height: "120vw",
  borderRadius: "50%",
  top: "-30%", left: "-55%",
  background: "radial-gradient(circle, #C02818 0%, #901808 45%, transparent 65%)",
  opacity: 0.92,
  animation: "float1 30s ease-in-out infinite",
}} />


{/* VERMELHO CENTRO */}
<div style={{
  position: "absolute",
  width: "140vw", height: "140vw",
  borderRadius: "50%",
  top: "20%", left: "-85%",
  background: "radial-gradient(circle, #C02818 0%, #901808 45%, transparent 65%)",
  opacity: 0.95,
  animation: "b4 24s ease-in-out infinite",
}} />

{/* VERMELHO BOTTOM ESQUERDA */}
<div style={{
  position: "absolute",
  width: "130vw", height: "130vw",
  borderRadius: "50%",
  bottom: "-35%", left: "-45%",
  background: "radial-gradient(circle, #C02818 0%, #901808 45%, transparent 65%)",
  opacity: 0.90,
  animation: "float2 36s ease-in-out infinite",
}} />

      {/* GRAIN */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          opacity: 0.08,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E")`,
          animation: "grain .8s steps(1) infinite",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BRAND — usa a imagem real enviada pelo usuário
   Sem fundo preto, só o logo+texto visível
───────────────────────────────────────────── */
function Brand({ height = 170 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto"
      }}
    >
      <img
        src="/logo2.png"
        alt="Adoles"
        style={{
          height: height,
          width: "auto",
          objectFit: "contain",

          filter:
            height >= 180
              ? "brightness(1) drop-shadow(0 0 18px rgba(255,255,255,0))"
              : "brightness(1) drop-shadow(0 0 12px rgba(255,255,255,0))",
          }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PARTÍCULAS — sutis, premium
───────────────────────────────────────────── */
function Particles() {
  const pts = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i, 
      x: Math.random() * 100, 
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2, 
      dur: 7 + Math.random() * 9,
      delay: Math.random() * 7, 
      opacity: 0.1 + Math.random() * 0.20,
    }))
  ).current;
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}`}</style>
      {pts.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "white", opacity: p.opacity,
          animation: `float ${p.dur}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   LIGHT BURST — tela de sucesso
───────────────────────────────────────────── */
function LightBurst() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}>
      <style>{`
        @keyframes burst{0%{opacity:0;transform:scale(0.4)}25%{opacity:0.9}100%{opacity:0;transform:scale(3)}}
        @keyframes ray{0%{opacity:0;transform:scaleY(0) translateY(0)}20%{opacity:0.5}100%{opacity:0;transform:scaleY(1) translateY(-55vh)}}
      `}</style>
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 1.5, height: "48vh",
          background: "linear-gradient(to top, transparent, rgba(255,255,255,0.7), transparent)",
          transformOrigin: "bottom center",
          transform: `rotate(${angle}deg)`,
          animation: `ray 1.8s ${i * 0.06}s ease-out both`,
        }} />
      ))}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 100, height: 100, marginLeft: -50, marginTop: -50,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)",
        animation: "burst 1.6s ease-out both",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR — linha fina no topo
───────────────────────────────────────────── */
function ProgressBar({ step }) {
  const pct = [0, 33, 66, 100][step] ?? 0;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 2, background: "rgba(0,0,0,0.1)" }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: "linear-gradient(90deg, #1E3EC0, #C02818, #1E3EC0)",
        transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD — escuro translúcido, fundo visível
   backdrop blur BEM menor que antes
───────────────────────────────────────────── */
function Card({ children, style = {}, onClick, className }) {  
  const [hover, setHover] = useState(false);
  
  return (
    <div
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(6px) saturate(120%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        willChange: "transform, box-shadow",
        boxShadow:
        hover
        ? "0 18px 45px rgba(0,0,0,0.35)"
        : "0 8px 20px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255, 255, 255, 0.29)",
        borderRadius: 18,
        ...style,
      }}
    >      
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INPUT
───────────────────────────────────────────── */
      function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  inputMode,
  error
}) {  
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 12, 
        letterSpacing: "0.22em", 
        color: "rgba(255,255,255,0.95)",
        fontFamily: "'DM Sans',sans-serif", 
        fontWeight: 600,
        textTransform: "uppercase", 
        marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{ position: "relative" }}>
        <input
          inputMode={inputMode}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="words"
          className="mainInput"
          type={type} value={value} onChange={onChange}
          placeholder={placeholder} maxLength={maxLength}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "14px clamp(14px, 4vw, 18px)",
            background: "rgba(255,255,255,0.10)",
            border: focused
              ? "1px solid rgba(255,255,255,0.95)"
              : error
              ? "1px solid rgba(255,100,80,0.8)"   // borda vermelha se erro
              : "1px solid rgba(255,255,255,0.18)",
            borderRadius: 12, 
            color: "#ffffff",
            fontSize: 16,
            fontFamily: "'DM Sans',sans-serif", 
            outline: "none",
            transition: "all 0.2s ease",
            boxShadow: focused
              ? "0 0 0 3px rgba(30,62,192,0.15)"
              : error
              ? "0 0 0 3px rgba(255,80,60,0.12)"   // glow vermelho se erro
              : "none",
          }}
        />
        {focused && (
          <div style={{
            position: "absolute", bottom: 0, left: "8%", right: "8%", height: 1,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)",
          }} />
        )}
      </div>

      {/* Mensagem de erro */}
      {error && !focused && (
        <div style={{
          marginTop: 6,
          fontSize: 11,
          color: "rgba(255,120,100,0.95)",
          letterSpacing: "0.05em",
          paddingLeft: 4,
          animation: "fadeUp 0.2s ease",
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BUTTON
───────────────────────────────────────────── */
function Btn({ children, onClick, disabled = false, variant = "primary", style = {} }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const base = {
    width: "100%", 
    padding: "16px 0", 
    border: "none", 
    borderRadius: 14,
    fontFamily: "'DM Sans',sans-serif", 
    fontSize: 14, 
    fontWeight: 700,
    letterSpacing: "0.1em", cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform .12s ease-out",
    transform:
    active
    ? "scale(0.96)"
    : hover
    ? "scale(1.01)"
    : "scale(1)",
    opacity: disabled ? 0.35 : 1, 
    position: "relative", 
    overflow: "hidden",
    willChange: "transform",
    ...style,
  };
  const prim = {
    background: hover ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.90)",
    color: "#060614",
    boxShadow: hover
      ? "0 14px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.25)"
      : "0 4px 20px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.12)",
  };
  const sec = {
    background: "rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: 12,
    letterSpacing: "0.08em",
    backdropFilter: "blur(6px)",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}
      onTouchStart={() => setActive(true)} onTouchEnd={() => setActive(false)}
      style={{ ...base, ...(variant === "primary" ? prim : sec) }}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   ADMIN PANEL
───────────────────────────────────────────── */
function AdminPanel({ data, onBack, onHistorico, onDelete }) {
  const [q, setQ] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [soVisitantes, setSoVisitantes] = useState(false);

  useEffect(() => {
  let timer = setTimeout(() => {
    alert("Sessão encerrada por inatividade.");
    onBack();
  }, 12 * 60 * 60 * 1000);

  const resetar = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      alert("Sessão encerrada por inatividade.");
      onBack();
    }, 12 * 60 * 60 * 1000);
  };

  window.addEventListener("mousemove", resetar);
  window.addEventListener("keydown", resetar);
  window.addEventListener("touchstart", resetar);
  window.addEventListener("scroll", resetar);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("mousemove", resetar);
    window.removeEventListener("keydown", resetar);
    window.removeEventListener("touchstart", resetar);
    window.removeEventListener("scroll", resetar);
  };
}, []);

  const list = data.filter(d => {
  const telefoneLimpo = d.telefone?.replace(/\D/g, "");
  const buscaLimpa = q.replace(/\D/g, "");

  const matchBusca = q.trim() === ""
    ? true
    : d.nome?.toLowerCase().includes(q.toLowerCase().trim()) ||
      (buscaLimpa.length > 0 && telefoneLimpo.includes(buscaLimpa));

  const matchData = dataFiltro
    ? d.data === new Date(dataFiltro + "T00:00:00").toLocaleDateString("pt-BR")
    : true;

  const matchVisitante = soVisitantes ? d.primeira_vez : true;

  return matchBusca && matchData && matchVisitante;
});

  const agrupados = useMemo(() => {
    return list.reduce((acc, item) => {
      if (!acc[item.data]) acc[item.data] = [];
      acc[item.data].push(item);
      return acc;
    }, {});
  }, [list]);

  function exportCSV() {
  const dados = data
    .slice()
    .sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split("/");
      const [diaB, mesB, anoB] = b.data.split("/");
      return new Date(anoB, mesB - 1, diaB) - new Date(anoA, mesA - 1, diaA);
    })
    .map(d => ({
      Nome: d.nome,
      Telefone: d.telefone,
      Nascimento: d.nascimento,
      Idade: `${calcularIdade(d.nascimento)} anos`,
      "Primeira Visita": d.primeira_vez ? "Sim" : "Não",
      Data: d.data,
      Hora: d.hora,
    }));

  const ws = XLSX.utils.json_to_sheet(dados);
  ws["!cols"] = [
    { wch: 28 }, { wch: 20 }, { wch: 16 },
    { wch: 12 }, { wch: 18 }, { wch: 14 }, { wch: 10 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Adolescentes");
  XLSX.writeFile(wb, "adoles.xlsx");
}

  function calcularIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split("/");
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const fezAniversario =
      hoje.getMonth() > nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() >= nascimento.getDate());
    if (!fezAniversario) idade--;
    return idade;
  }

  function ultimaPresenca(telefone) {
    const registrosMesmoNumero = data.filter(d => d.telefone === telefone);
    if (registrosMesmoNumero.length <= 1) return "Primeira presença";
    const ordenados = [...registrosMesmoNumero].sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split("/");
      const [diaB, mesB, anoB] = b.data.split("/");
      return new Date(anoB, mesB - 1, diaB) - new Date(anoA, mesA - 1, diaA);
    });
    return `Última presença: ${ordenados[1].data}`;
  }

  async function deletar(id) {
    const confirma = window.confirm("Tem certeza que quer excluir esse registro?");
    if (!confirma) return;
    const { error } = await supabase
      .from("adolescentes")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Erro ao excluir");
      return;
    }
    onDelete();
  }

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      fontFamily: "'DM Sans',sans-serif",
      overscrollBehavior: "none"
    }}>
      <AuraBackground />
      <div style={{
        position: "relative",
        zIndex: 10,
        padding: "40px clamp(20px,4vw,40px) 40px",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto"
      }}>

        <button onClick={onBack} style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 50,
          color: "rgba(255,255,255,0.6)",
          padding: "8px 18px",
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
          letterSpacing: "0.1em",
          marginBottom: 0
        }}>← VOLTAR</button>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Brand height={120} />
          <div style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 18,
            letterSpacing: "0.2em",
            marginTop: 14,
            fontWeight: 700
          }}>PAINEL ADMINISTRATIVO</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            {
              l: "Cadastros de hoje",
              v: data.filter(d => d.data === new Date().toLocaleDateString("pt-BR")).length
            },
            {
              l: "Primeiras Visitas de hoje",
              v: data.filter(d => d.primeira_vez && d.data === new Date().toLocaleDateString("pt-BR")).length
            }
          ].map((s, i) => (
            <Card key={i} style={{
              padding: "10px 20px",
              textAlign: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4))",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "white" }}>{s.v}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.9)", letterSpacing: "0.18em", marginTop: 6 }}>{s.l.toUpperCase()}</div>
            </Card>
          ))}
        </div>

        {/* FILTROS */}
        <Card style={{ padding: 18, marginBottom: 14, maxWidth: 900, marginInline: "auto" }}>

          {/* BUSCA */}
          <input
            className="searchAdmin"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar por nome ou telefone..."
            onKeyDown={e => {
              if (e.key === "Enter") {
              e.target.blur();
                setTimeout(() => {
                const primeiroCard = document.querySelector(".card-resultado");
                if (primeiroCard) {
                  primeiroCard.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
              }
             }}

            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              background: "rgba(255,255,255,0)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 10,
              color: "#fff",
              WebkitTextFillColor: "#FFFFFF",
              caretColor: "#FFFFFF",
              fontSize: 12,
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              marginBottom: 10,
              backdropFilter: "blur(8px)",
            }}
          />

            {/* LINHA DE FILTROS */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>

            {/* FILTRO DATA */}
            <div style={{ position: "relative", flex: 1 }}>
            <div style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.1em",
              marginBottom: 5,
              paddingLeft: 6,
            }}>
            Buscar por data do culto:
           </div>

             <input
              type="date"
              value={dataFiltro}
              onChange={e => setDataFiltro(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "8px 10px",
                background: dataFiltro ? "rgba(30,62,192,0.35)" : "rgba(255,255,255,0.10)",
                border: dataFiltro ? "1px solid rgba(100,140,255,0.8)" : "1px solid rgba(255,255,255,0.3)",
                borderRadius: 10,
                color: dataFiltro ? "#fff" : "rgba(255,255,255,0.9)",
                fontSize: 14,
                fontFamily: "'DM Sans',sans-serif",
                outline: "none",
                colorScheme: "dark",
                cursor: "pointer",
            }}/>

            </div>

            {/* FILTRO 1ª VEZ */}
            <button
              onClick={() => setSoVisitantes(v => !v)}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: soVisitantes ? "1px solid rgba(255,89,0,0.8)" : "1px solid rgba(255,255,255,0.3)",
                background: soVisitantes ? "rgba(255,89,0,0.25)" : "rgba(255,255,255,0.10)",
                color: soVisitantes ? "rgb(255,89,0)" : "rgba(255,255,255,0.7)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              1ª VEZ
            </button>

          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn onClick={onHistorico} style={{ padding: "12px 0", fontSize: 12 }}>
              HISTÓRICO DE CULTOS
            </Btn>
            <Btn onClick={exportCSV} variant="secondary" style={{ padding: "12px 0", fontSize: 12 }}>
              EXPORTAR TUDO (EM EXCEL)
            </Btn>
          </div>
        </Card>

        {/* LISTA */}
        {Object.entries(agrupados)
          .sort((a, b) => {
            const [diaA, mesA, anoA] = a[0].split("/");
            const [diaB, mesB, anoB] = b[0].split("/");
            return new Date(anoB, mesB - 1, diaB) - new Date(anoA, mesA - 1, diaA);
          })
          .map(([data, itens]) => (
            <div key={data} style={{ marginBottom: 24, marginTop: 30 }}>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}>
                <div style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 20,
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginLeft: 12,
                }}>{data}</div>
                <div style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  marginRight: 10,
                }}>{itens.length} presenças</div>
              </div>

              {itens.map((d, i) => (
                <Card
                  key={i}
                  className="card-resultado"
                  style={{
                    background: "rgba(113,102,102,0.38)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.38)",
                    padding: "16px 18px",
                    marginBottom: 10,
                    cursor: "pointer",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                  }}
                  onClick={() => {
                    const numero = d.telefone.replace(/\D/g, "");
                    window.open(`https://wa.me/55${numero}`, "_blank");
                  }}
                >
                  {/* BOTÃO EXCLUIR */}
                  <button
                    onClick={e => { e.stopPropagation(); deletar(d.id); }}
                    style={{
                      position: "absolute",
                      top: 10, right: 10,
                      background: "rgba(255,60,60,0.15)",
                      border: "1px solid rgba(255,60,60,0.3)",
                      borderRadius: 8,
                      color: "rgba(255,100,100,0.8)",
                      fontSize: 13,
                      width: 28, height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >🗑</button>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    textAlign: "left",
                    paddingRight: 32,
                  }}>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{d.nome}</div>
                      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 3 }}>
                        {d.telefone} · {d.nascimento} · {calcularIdade(d.nascimento)} anos
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4 }}>
                        {ultimaPresenca(d.telefone)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                      {d.primeira_vez && (
                        <span style={{
                          background: "rgba(0,0,255,0.21)",
                          border: "1px solid rgba(0,17,255,0.28)",
                          color: "rgb(255,89,0)",
                          fontSize: 10, padding: "2px 9px",
                          borderRadius: 50, letterSpacing: "0.14em", fontWeight: 700,
                        }}>1ª VEZ</span>
                      )}
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, fontWeight: 600 }}>
                        {d.hora}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}

        {list.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.22)", padding: 40, fontSize: 13 }}>
            Nenhum resultado
          </div>
        )}
      </div>
    </div>
  );
}

  function HistoricoCultos({ data, onBack }) {

  const [q, setQ] = useState("");
  
  // TIMEOUT 5 MINUTOS
useEffect(() => {
  let timer = setTimeout(() => {
    alert("Sessão encerrada por inatividade.");
    onBack();
  }, 12 * 60 * 60 * 1000);

  const resetar = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      alert("Sessão encerrada por inatividade.");
      onBack();
    }, 12 * 60 * 60 * 1000); // 12 horas
  };

  window.addEventListener("mousemove", resetar);
  window.addEventListener("keydown", resetar);
  window.addEventListener("touchstart", resetar);
  window.addEventListener("scroll", resetar);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("mousemove", resetar);
    window.removeEventListener("keydown", resetar);
    window.removeEventListener("touchstart", resetar);
    window.removeEventListener("scroll", resetar);
  };
}, []);

  const agrupados = data.reduce((acc, item) => {
  const matchData = q
    ? item.data === new Date(q + "T00:00:00").toLocaleDateString("pt-BR")
    : true;

  if (!matchData) return acc;

  if (!acc[item.data]) acc[item.data] = [];
  acc[item.data].push(item);
  return acc;
}, {});


function calcularIdade(dataNascimento) {
  const [dia, mes, ano] = dataNascimento.split("/");

  const nascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const fezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() >= nascimento.getDate());

    if (!fezAniversario) {
      idade--;
    }

    return idade;
  }  

  function exportarCulto(dataCulto, registros) {

  try {

    const pdf = new jsPDF();

    const visitantes = registros.filter(
      r => r.primeira_vez
    ).length;

    const img = new Image();

    img.src = "/logo2.png";

    img.onload = () => {

  // 1º — retângulo azul do cabeçalho
  pdf.setFillColor(41, 54, 150);
  pdf.rect(0, 0, 210, 42, "F");

  // 2º — logo em cima do retângulo
  pdf.addImage(img, "PNG", 70, 5, 70, 30);

  // 3º — título branco em cima do retângulo
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.text("RELATÓRIO DE PRESENÇA", 105, 37, { align: "center" });

  // 4º — infos abaixo do cabeçalho
  pdf.setTextColor(40, 40, 40);
  pdf.setFontSize(12);
  pdf.text(`Culto: ${dataCulto}`, 14, 55);
  pdf.text(`Presentes: ${registros.length}`, 80, 55);
  pdf.text(`Visitantes: ${visitantes}`, 145, 55);

  // 5º — tabela
  autoTable(pdf, {
    startY: 65,
    head: [["Nome", "Idade", "Nascimento", "Telefone", "1ª vez", "Hora"]],
    body: registros.map(d => [
      d.nome,
      calcularIdade(d.nascimento) + " anos",
      d.nascimento,
      d.telefone,
      d.primeira_vez ? "Sim" : "Não",
      d.hora
    ]),
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 20 },
      2: { cellWidth: 25 },
      3: { cellWidth: 30 },
      4: { cellWidth: 20 },
      5: { cellWidth: 15 },
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [41, 54, 150],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [225, 225, 225],
    },
    margin: { left: 8, right: 14 }
  });

  // 6º — salva
  pdf.save(`culto-${dataCulto.replace(/\//g, "-")}.pdf`);
};

  } catch (err) {

    console.error(err);

    alert("Erro ao gerar PDF");
  }
}

  return (
  
    <>
    <style>{`
  .searchCulto::placeholder {
    color: rgb(255, 255, 255);
    text-shadow: 0 0 8px rgba(80, 140, 255, 0.5);
  }
`}</style>

  <div style={{
  minHeight: "100vh",
  position: "relative",
  fontFamily: "'DM Sans',sans-serif",
  overscrollBehavior: "none"
}}>

    <AuraBackground />
    <Particles />

    <div style={{
    position: "relative",
    zIndex: 10,
    padding: "40px clamp(20px,4vw,40px) 40px",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
  }}>

  <button
    onClick={onBack}
    style={{
      background: "rgba(0,0,0,0.3)", 
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 50, 
      color: "rgba(255,255,255,0.6)", 
      padding: "8px 18px",
      fontSize: 14, 
      cursor: "pointer", 
      fontFamily: "'DM Sans',sans-serif",
      letterSpacing: "0.1em", 
      marginBottom: 28,
    }}
  >
    ← VOLTAR
  </button>

  <div style={{
    textAlign: "center",
    marginBottom: 30,
  }}>

    <Brand height={120} />

    <div style={{
      color: "rgba(255,255,255,0.85)",
      fontSize: 22,
      letterSpacing: "0.2em",
      marginTop: 10,
      fontWeight: 700,
    }}>
      HISTÓRICO DE CULTOS
    </div>

    <div style={{
      color: "rgba(255,255,255,0.65)",
      fontSize: 12,
      marginTop: 18,
    }}>
      Escolha um culto para baixar o relatório
    </div>

   <Card style={{ 
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
    marginInline: "auto",
    maxWidth: 900
  }}>

  <div style={{ position: "relative" }}>
  <div style={{
    fontSize: 10,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: "0.1em",
    marginBottom: 10,
    paddingLeft: 2,
    fontWeight: 700
  }}>
    BUSCAR POR DATA DO CULTO
  </div>
  <input
    type="date"
    value={q}
    onChange={e => setQ(e.target.value)}
    style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "6px 14px",
      background: q ? "rgba(255, 255, 255, 0.2)" : "rgba(255,255,255,0.10)",
      border: q ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid rgba(255,255,255,0.3)",
      borderRadius: 10,
      color: q ? "#fff" : "rgba(255,255,255,0.5)",
      fontSize: 13,
      fontFamily: "'DM Sans',sans-serif",
      outline: "none",
      colorScheme: "dark",
      cursor: "pointer",
      fontWeight: 500,
    }}
  />
</div>

</Card>

  </div>

      {Object.entries(agrupados)
  .sort((a, b) => {
    const [diaA, mesA, anoA] = a[0].split("/");
    const [diaB, mesB, anoB] = b[0].split("/");

    const dataA = new Date(anoA, mesA - 1, diaA);
    const dataB = new Date(anoB, mesB - 1, diaB);

    return dataB - dataA;
  })
  .map(([dataCulto, registros]) => {

        const visitantes = registros.filter(r => r.primeira_vez).length;

        return (
          <Card
            key={dataCulto}
            style={{
              padding: "14px",
              marginBottom: 16,
            }}
          >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>

              <div>

                <div style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: 800,
                  marginBottom: 8,
                }}>
                  {dataCulto}
                </div>

                <div style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  lineHeight: 1.7,
                }}>
                  {registros.length} presenças
                  <br />
                  {visitantes} visitantes
                </div>

              </div>

              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    exportarCulto(dataCulto, registros);
  }}
  style={{
    background: "white",
    color: "#060614",
    border: "none",
    borderRadius: 12,
    padding: "14px 18px",
    fontWeight: 800,
    cursor: "pointer",
  }}
>
  BAIXAR
</button>

            </div>

          </Card>
        );
      })}
      
        </div>
      </div>
  </>
);
}

function onlyNumbers(v) {
  return v.replace(/\D/g, "");
}

function validarTelefone(phone) {
  const n = onlyNumbers(phone);
  return n.length >= 10 && n.length <= 11;
}

function validarNome(nome) {
  return nome
    .trim()
    .split(" ")
    .filter(Boolean).length >= 2;
}

function validarData(data) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;

  const [dia, mes, ano] = data.split("/").map(Number);

  const d = new Date(ano, mes - 1, dia);

  const valida =
    d.getFullYear() === ano &&
    d.getMonth() === mes - 1 &&
    d.getDate() === dia;

  if (!valida) return false;

  const hoje = new Date();

  if (d > hoje) return false;

  const idade = hoje.getFullYear() - ano;

  return idade >= 5 && idade <= 30;
}

function SenhaModal({ onConfirm, onClose }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  function tentar() {
    if (senha === "adoles26@") {
      onConfirm(senha);
    } else {
      setErro(true);
      setSenha("");
      setTimeout(() => setErro(false), 2000);
    }
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
    }}>
      <AuraBackground />
      <Particles />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 380 }}>
        <Brand height={140} />

        <Card style={{ padding: "25px 24px", marginTop: 20, textAlign: "center" }}>

          <div style={{
            fontSize: 14,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.9)",
            marginBottom: 24,
            fontWeight: 900,  // ← adiciona isso
          }}>
            ACESSO ADMINISTRATIVO
          </div>

          <input
            className="senhaInput"
            type="text"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === "Enter" && tentar()}
            placeholder="Digite a senha"
            autoFocus
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 18px",
              background: erro ? "rgba(255,60,60,0.15)" : "rgba(255,255,255,0.10)",
              border: erro ? "1px solid rgba(255,60,60,0.6)" : "1px solid rgba(255,255,255,0.18)",
              borderRadius: 12,
              color: "#fff",
              fontSize: 16,
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              marginBottom: 8,
              textAlign: "center",
              letterSpacing: "0.2em",
              transition: "all 0.2s ease",
            }}
          />

          {erro && (
            <div style={{
              color: "rgba(255,100,100,0.95)",
              fontSize: 11,
              marginBottom: 16,
              letterSpacing: "0.05em",
              animation: "fadeUp 0.2s ease",
            }}>
              Senha incorreta
            </div>
          )}

          <div style={{ height: 16 }} />

          <Btn onClick={tentar}>ENTRAR</Btn>

          <div style={{ marginTop: 14 }}>
            <button onClick={onClose} style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.1em",
            }}>CANCELAR</button>
          </div>

        </Card>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [step, setStep] = useState(0);
  const [vis, setVis] = useState(false);
  const [phone, setPhone] = useState("");
  const [nome, setNome] = useState("");
  const [nasc, setNasc] = useState("");
  const [first, setFirst] = useState(null);
  const [loading, setLoading] = useState(false);
  const [burst, setBurst] = useState(false);
  const [admin, setAdmin] = useState(() => sessionStorage.getItem("adminLogado") === "true");
  const [historico, setHistorico] = useState(() => sessionStorage.getItem("historicoAberto") === "true");
  const [tapCount, setTap] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [senhaAdmin, setSenhaAdmin] = useState(false);

    useEffect(() => {
  carregarRegistros();

  const canal = supabase
    .channel("adolescentes-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "adolescentes" },
      () => {
        carregarRegistros();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(canal);
  };
}, []);

  async function carregarRegistros() {

  const { data, error } = await supabase
    .from("adolescentes")
    .select("*")
    .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRegistros(data);
  }

  useEffect(() => { 
    setTimeout(() => setVis(true), 60); }, []);

  const tr = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0) scale(1)" : "translateY(14px) scale(0.985)",
    transition: `all 0.55s ${delay}s cubic-bezier(.22,1,.36,1)`,  
  });

  function goStep(n) {
  setVis(false);

  requestAnimationFrame(() => {
    setTimeout(() => {
      setStep(n);

      requestAnimationFrame(() => {
        setVis(true);
      });
    }, 240);
  });
}

    useEffect(() => {
  if (admin || historico) {
    document.body.classList.remove("no-scroll");
  } else {
    document.body.classList.add("no-scroll");
  }

  return () => {
    document.body.classList.remove("no-scroll");
  };
}, [admin, historico]);

    useEffect(() => {
      document.title = "RC Adolescentes";
    }, []);

    useEffect(() => {
  if (!admin && !historico) {
    sessionStorage.removeItem("adminLogado");
    sessionStorage.removeItem("historicoAberto");
  }
}, [admin, historico]);

useEffect(() => {
  if (admin || historico) return;

  let timer = setTimeout(() => {
    setStep(0);
    setPhone("");
    setNome("");
    setNasc("");
    setFirst(null);
  }, 5 * 60 * 1000);

  const resetar = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setStep(0);
      setPhone("");
      setNome("");
      setNasc("");
      setFirst(null);
    }, 5 * 60 * 1000);
  };

  window.addEventListener("touchstart", resetar);
  window.addEventListener("mousemove", resetar);
  window.addEventListener("keydown", resetar);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("touchstart", resetar);
    window.removeEventListener("mousemove", resetar);
    window.removeEventListener("keydown", resetar);
  };
}, [admin, historico, step]);

  function formatPhone(v) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  function formatDate(v) {
    const d = v.replace(/\D/g, "").slice(0, 8);
    if (d.length <= 2) return d;
    if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
    return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
  }

  async function submit() {

  if (loading) return;

  setLoading(true);

  navigator.vibrate?.(30);

  await new Promise(r => setTimeout(r, 1100));

  const jaExisteHoje = registros.some(r => {
    return (
      onlyNumbers(r.telefone) === onlyNumbers(phone) &&
      r.data === new Date().toLocaleDateString("pt-BR")
    );
  });

  if (jaExisteHoje) {

    alert("Esse número já foi registrado hoje.");

    setLoading(false);

    return;
  }

  try {

    const { error } = await supabase
      .from("adolescentes")
      .insert([
        {
          nome,

          telefone: phone,

          nascimento: nasc,

          primeira_vez: first,

          data: new Date().toLocaleDateString("pt-BR"),

          hora: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);

    if (error) {

      console.error(error);

      alert("Erro ao salvar");

      setLoading(false);

      return;
    }

    await carregarRegistros();

    setLoading(false);

    setVis(false);

    setTimeout(() => {

      setStep(3);

      setBurst(true);

      setTimeout(() => setVis(true), 40);

      setTimeout(() => setBurst(false), 2200);

    }, 300);

  } catch (err) {

    console.error(err);

    alert("Erro ao salvar os dados.");

    setLoading(false);
  }
}

  function tapLogo() {
  const n = tapCount + 1; setTap(n);
  if (n >= 3) { 
    setSenhaAdmin(true);
    setTap(0); 
  }
  setTimeout(() => setTap(t => Math.max(0, t - 1)), 1500);
}

  function resetAll() {
    setVis(false);
    setTimeout(() => {
      setStep(0); setPhone(""); setNome(""); setNasc(""); setFirst(null);
      setTimeout(() => setVis(true), 40);
    }, 300);
  }

  if (historico) {
  return (
    <HistoricoCultos
      data={registros}
      onBack={() => setHistorico(false)}
    />
  );
}

if (admin) {
  return (
    <AdminPanel
      data={registros}
      onBack={() => setAdmin(false)}
      onHistorico={() => setHistorico(true)}
      onDelete={carregarRegistros}
    />
  );
}

if (senhaAdmin) {
  return (
    <SenhaModal
      onConfirm={(senha) => {
        if (senha === "adoles26@") {
          setAdmin(true);
          sessionStorage.setItem("adminLogado", "true");
          setSenhaAdmin(false);
        } else {
          alert("Senha incorreta!");
        }
      }}
      onClose={() => setSenhaAdmin(false)}
    />
  );
}

  const canPhone = validarTelefone(phone);
  const canForm =
    validarNome(nome) &&
    validarData(nasc) &&
    first !== null;
  const BackBtn = ({ to }) => (
    <div style={{ textAlign: "center", marginTop: 16 }}>
      <button onClick={() => goStep(to)} style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.55)",
        fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em",
      }}>VOLTAR</button>
    </div>
  );

  return (
    <div style={{ 
      minHeight: "100dvh",
      width: "100%",
      position: "relative",
      fontFamily: "'DM Sans',sans-serif",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,500;0,700;0,800;1,300&family=Poppins:wght@700;800&family=Playfair+Display:ital,wght@1,700&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        img {
          user-select: none;
          -webkit-user-drag: none;
        }

        .searchCulto::placeholder {
          color: rgba(255, 255, 255, 0.75);
        }

        .mainInput::placeholder {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 350;
        }

        .mainInput::-webkit-input-placeholder {
          color: rgba(255,255,255,0.55);
        }

        .mainInput::-moz-placeholder {
          color: rgba(255,255,255,0.15);
        }

        .searchAdmin::placeholder {
          color: rgba(255,255,255,0.92);
          text-shadow: 
            0 0 8px rgba(80,140,255,0.45),
            0 0 18px rgba(80,140,255,0.22);
            letter-spacing: 0.05em;
        }
        ::-webkit-scrollbar { display: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes logoGlow { 
        0%,100%{
        filter:drop-shadow(0 0 10px rgba(255, 255, 255, 0.12));
        } 
        50%{
        filter:drop-shadow(0 0 22px rgba(255, 255, 255, 0.12));        }
      }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <AuraBackground />
      <Particles />
      {burst && <LightBurst />}
      {step > 0 && step < 3 && <ProgressBar step={step} />}

        <div
        style={{ 
        position: "relative",
        zIndex: 10,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 clamp(14px, 4vw, 22px)"
        }}>
        
        {/* ══ TELA 1 — HERO ══ */}
        {step === 0 && (
          <div style={{ flex: 1, display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          paddingTop: 30, 
          paddingBottom: 130
          }}>

            {/* Logo + Adoles — imagem real com blend mode */}
            <div
              onClick={tapLogo}
              style={{
                ...tr(0), 
                marginBottom: 44, 
                cursor: "pointer",
                animation: "logoGlow 4s ease-in-out infinite",
              }}
            >
              <Brand height={210} />
            </div>

            {/* Card hero */}
            <div style={{ ...tr(0.1), 
              width: "100%", 
              maxWidth: 420,
              margin: "0 auto"
            }}>
              
              <Card style={{ padding: "clamp(22px, 5vw, 38px) clamp(18px, 4vw, 28px)", textAlign: "center" }}>
                <p style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontStyle: "normal",  // ← era italic
                  fontWeight: 800,
                  fontSize: "clamp(21px, 6vw, 27px)", lineHeight: 1.45, color: "white",
                  margin: "0 0 24px",
                  textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                }}>
                  Mais que um encontro,<br />um chamado!              
                </p>
                <p style={{
                  color: "rgba(255,255,255,0.80)", fontSize: 13.5,
                  lineHeight: 1.75, margin: "0 0 32px", fontWeight: 300,
                }}>
                  Faça seu check-in e venha fazer parte dessa família!
                </p>
                <Btn onClick={() => goStep(1)}>FAZER CHECK-IN</Btn>
              </Card>
            </div>

            <div style={{ ...tr(0.2), 
              marginTop: 26, 
              color: "rgba(255,255,255,0.50)", 
              fontSize: 12, 
              letterSpacing: "0.28em" 
              }}>
              @rc_adolescentes

            </div>
          </div>
        )}

        {/* ══ TELA 2 — TELEFONE ══ */}
        {step === 1 && (
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center", 
            paddingTop: 30, 
            paddingBottom: 110
            }}>

            <div style={{ ...tr(0), 
              textAlign: "center", 
              marginBottom: 15 
              }}>

              <div onClick={tapLogo} style={{ display: "inline-block", marginBottom: 0, cursor: "pointer" }}>
                <Brand height={180} />

              </div>

              <div style={{ 
                fontSize: 10, 
                letterSpacing: "0.28em", 
                color: "rgba(255,255,255,0.65)", 
                marginBottom: 12
                }}>
                  ETAPA 1 DE 2
                
                </div>
              <h2 style={{ 
                color: "white", 
                fontSize: "clamp(22px, 7vw, 30px)", 
                fontWeight: 800, 
                margin: "0 0 15px", 
                letterSpacing: "0.01em"
                }}>
                Qual é o seu número?

              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: 10, fontWeight: 300 }}>
                Seus dados ficam seguros com a gente!
              </p>
            </div>

            <div style={{ ...tr(0.08), 
              width: "100%", 
              maxWidth: 420, 
              margin: "0 auto",
             

              }}>
              <Card style={{ padding: "28px 24px", margin: "0 auto"}}>
                <Input
                  label="WhatsApp / Telefone"
                  value={phone}
                  onChange={e => setPhone(formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  type="tel"
                  inputMode="numeric"
                  maxLength={15}
                />
                <div style={{ height: 8 }} />
                <Btn onClick={() => goStep(2)} disabled={!canPhone}>CONTINUAR</Btn>
                <BackBtn to={0} />
              </Card>
            </div>

            <div style={{ ...tr(0.2), marginTop: 26, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.28em" }}>
              @rc_adolescentes
            </div>
          </div>
        
        )}

        {/* ══ TELA 3 — FORMULÁRIO ══ */}
        {step === 2 && (
          <div style={{ 
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            paddingTop: 35,
            paddingBottom: 0
          }}>

            <div style={{ 
              ...tr(0.08),
              width: "100%",
              maxWidth: 420,
              margin: "0 auto",
              marginTop: -35
            }}>

              <div
                onClick={tapLogo}
                style={{
                  display: "inline-block",
                  marginBottom: 10,
                  cursor: "pointer",
                  transform: "translateY(0)"
              }}>
              <Brand height={125} />

              </div>

              <div style={{ 
                fontSize: 10, 
                letterSpacing: "0.28em", 
                color: "rgba(255,255,255,0.65)", 
                marginBottom: 12 
                }}>
                  ETAPA 2 DE 2
                </div>
                
              <h2 style={{ 
                color: "white", 
                fontSize: "clamp(22px, 7vw, 30px)", 
                fontWeight: 800, 
                margin: "0 0 15px", 
                letterSpacing: "0.01em" 
                }}>
                  Sobre você
                </h2>

              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: 10, fontWeight: 300 }}>
                Cada detalhe importa pra nós!
              </p>
            </div>

            <div style={{ ...tr(0.08), 
              width: "100%", 
              maxWidth: 420, 
              margin: "0 auto",
              }}>

              <Card style={{ 
                padding: "18px 18px",
                marginBottom: 20,
                marginTop: 12
              }}>
              
                <Input
                  label="Nome completo"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  error={
                    nome.length > 0 && !validarNome(nome)
                      ? "Digite seu nome completo (nome e sobrenome)"
                      : null
                    }
                />

                <Input
                  label="Data de nascimento"
                  value={nasc}
                  onChange={e => setNasc(formatDate(e.target.value))}
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  inputMode="numeric"
                  error={
                    nasc.length === 10 && !validarData(nasc)
                    ? "Data inválida"
                    : null
                   }
                />

                {/* Primeira vez */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    fontSize: 11.8, 
                    letterSpacing: "0.22em", 
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: 600, 
                    textTransform: "uppercase", 
                    marginBottom: 10,
                  }}>
                    Primeira vez no RC Adolescentes?
                  </div>
                  
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: 10 
                    }}>

                    {[{ v: true, l: "SIM" }, { v: false, l: "NÃO" }].map(o => {
                      const sel = first === o.v;
                      return (
                        <button key={String(o.v)} onClick={() => setFirst(o.v)} style={{
                          background: sel
                            ? o.v
                            ? "rgba(30,62,192,0.55)"
                            : "rgba(192,40,24,0.55)"
                            : "rgba(255,255,255,0.25)",

                          border: sel
                            ? o.v
                            ? "1px solid rgba(80,120,255,0.95)"
                            : "1px solid rgba(255,120,100,0.95)"
                            : "1px solid rgba(255,255,255,0.40)",

                          color: "white",

                          fontSize: 15,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          fontFamily: "'DM Sans',sans-serif",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          borderRadius: 12,
                          padding: "14px 10px",

                          boxShadow: sel
                            ? o.v
                            ? "0 0 10px rgba(30,62,192,0.35)"
                            : "0 0 10px rgba(192,40,24,0.35)"
                            : "none",

                        }}>{o.l}</button>
                      );
                    })}
                  </div>
                </div>

                <Btn onClick={submit} disabled={!canForm || loading}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <span style={{ 
                        width: 15, 
                        height: 15, 
                        border: "2px solid rgba(6,6,20,0.15)", 
                        borderTop: "2px solid #1E3EC0",
                        borderRadius: "50%", 
                        display: "inline-block", 
                        animation: "spin 0.75s linear infinite" 
                        }} />
                      REGISTRANDO...

                    </span>
                  ) : "CONFIRMAR CHECK-IN"}
                </Btn>
                <BackBtn to={1} />
              </Card>
            </div>

            <div style={{ ...tr(0.2), 
              marginTop: 2, 
              color: "rgba(255,255,255,0.5)", 
              fontSize: 12, 
              letterSpacing: "0.28em" 
              }}>
              @rc_adolescentes
            </div>
          </div>
        
        )}

        {/* ══ TELA 4 — SUCESSO ══ */}
        {step === 3 && (
          <div style={{ flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          textAlign: "center", 
          paddingTop: 10, 
          paddingBottom: 100 
          }}>

            {/* Brand com glow forte */}
            <div style={{ ...tr(0), 
              marginBottom: 30, 
              animation: "logoGlow 3s ease-in-out infinite"
              }} 

              onClick={tapLogo}>
             <Brand height={190} />
            </div>

            <div style={{ ...tr(0.08), 
              width: "100%", 
              maxWidth: 420, 
              marginTop: -40,
          

              }}>
                
              <Card style={{ padding: "25px 26px", position: "relative", overflow: "hidden" }}>
                {/* Glow ambiental no topo */}
                <div style={{
                  position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
                  width: 220, height: 220, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(30,62,192,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <div style={{ position: "relative" }}>
                  <div style={{
                    fontSize: 11, letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.80)", marginBottom: 25,
                  }}>CHECK-IN CONFIRMADO!</div>

                  <h2 style={{
                    fontFamily: "'Poppins',sans-serif",
fontStyle: "normal",  // ← era italic, tira
fontWeight: 800,
                    fontSize: "clamp(28px, 7vw, 35px)",
                    color: "white", lineHeight: 1.35,
                    margin: "0 0 30px",
                    textShadow: "0 2px 30px rgba(0,0,0,0.5)",
                    whiteSpace: "pre-line",
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                  }}>
                    {first
                      ? `Bem-vindo à família Adoles, ${nome.split(" ")[0]}!`
                      : `Que bom ter você\nde volta, ${nome.split(" ")[0]}!`
                    }
                  </h2>

                  <p style={{
                    color: "rgba(255,255,255,0.85)", fontSize: 14,
                    lineHeight: 1.8, margin: "0 0 30px", fontWeight: 300,
                    whiteSpace: "pre-line",
                  }}>
                    {first
                      ? "Deus já havia preparado esse encontro bem \nantes de você entrar pela porta!"
                      : "Sua presença importa, continue firme no propósito!"
                    }
                  </p>

                  {/* Versículo */}
                  <div style={{
                    borderLeft: "2px solid rgba(255,255,255,0.8)",
                    paddingLeft: 18, marginBottom: 30, textAlign: "left",
                  }}>
                    <p style={{
                      color: "rgba(255,255,255,0.95)", fontSize: 14,
                      fontStyle: "italic", fontFamily: "'Playfair Display',serif",
                      lineHeight: 1.8, margin: "0 0 8px",
                    }}>
                      "Porque eu sei os planos que tenho para vocês — planos de fazê-los prosperar."
                    </p>
                    <div style={{  fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>JEREMIAS 29:11</div>
                  </div>

                  <Btn variant="secondary" onClick={resetAll}>
                    CADASTRAR OUTRA PESSOA
                  </Btn>
                </div>
              </Card>
            </div>

            <div style={{ 
  ...tr(0.16), 
  marginTop: 24, 
  textAlign: "center"
}}>
  <div style={{
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    letterSpacing: "0.28em",
  }}>
    @rc_adolescentes
  </div>

  <div style={{
    marginTop: 30,
    color: "rgba(255,255,255,0.28)",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  }}>
    created by Arthur "Couto"
  </div>
</div>
          </div>
        )}

      </div>
    </div>
  );
}