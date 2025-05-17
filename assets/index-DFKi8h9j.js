var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_stdin = __commonJS({
  "<stdin>"(exports, module) {
    (async () => {
      (function() {
        const t = document.createElement("link").relList;
        if (t && t.supports && t.supports("modulepreload")) return;
        for (const n of document.querySelectorAll('link[rel="modulepreload"]')) c(n);
        new MutationObserver((n) => {
          for (const o of n) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && c(i);
        }).observe(document, {
          childList: true,
          subtree: true
        });
        function r(n) {
          const o = {};
          return n.integrity && (o.integrity = n.integrity), n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? o.credentials = "include" : n.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
        }
        function c(n) {
          if (n.ep) return;
          n.ep = true;
          const o = r(n);
          fetch(n.href, o);
        }
      })();
      const q = "/vaultic-crypto-engine-demo/assets/vaultic_crypto_engine_bg-BAjhQ1hb.wasm", P = async (e = {}, t) => {
        let r;
        if (t.startsWith("data:")) {
          const c = t.replace(/^data:.*?base64,/, "");
          let n;
          if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(c, "base64");
          else if (typeof atob == "function") {
            const o = atob(c);
            n = new Uint8Array(o.length);
            for (let i = 0; i < o.length; i++) n[i] = o.charCodeAt(i);
          } else throw new Error("Cannot decode base64-encoded data URL");
          r = await WebAssembly.instantiate(n, e);
        } else {
          const c = await fetch(t), n = c.headers.get("Content-Type") || "";
          if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(c, e);
          else {
            const o = await c.arrayBuffer();
            r = await WebAssembly.instantiate(o, e);
          }
        }
        return r.instance.exports;
      };
      let s;
      function H(e) {
        s = e;
      }
      function m(e) {
        const t = s.__externref_table_alloc();
        return s.__wbindgen_export_2.set(t, e), t;
      }
      function h(e, t) {
        try {
          return e.apply(this, t);
        } catch (r) {
          const c = m(r);
          s.__wbindgen_exn_store(c);
        }
      }
      const J = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
      let K = new J("utf-8", {
        ignoreBOM: true,
        fatal: true
      });
      K.decode();
      let A = null;
      function E() {
        return (A === null || A.byteLength === 0) && (A = new Uint8Array(s.memory.buffer)), A;
      }
      function w(e, t) {
        return e = e >>> 0, K.decode(E().subarray(e, e + t));
      }
      let f = 0;
      const z = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
      let S = new z("utf-8");
      const X = typeof S.encodeInto == "function" ? function(e, t) {
        return S.encodeInto(e, t);
      } : function(e, t) {
        const r = S.encode(e);
        return t.set(r), {
          read: e.length,
          written: r.length
        };
      };
      function b(e, t, r) {
        if (r === void 0) {
          const _ = S.encode(e), l = t(_.length, 1) >>> 0;
          return E().subarray(l, l + _.length).set(_), f = _.length, l;
        }
        let c = e.length, n = t(c, 1) >>> 0;
        const o = E();
        let i = 0;
        for (; i < c; i++) {
          const _ = e.charCodeAt(i);
          if (_ > 127) break;
          o[n + i] = _;
        }
        if (i !== c) {
          i !== 0 && (e = e.slice(i)), n = r(n, c, c = i + e.length * 3, 1) >>> 0;
          const _ = E().subarray(n + i, n + c), l = X(e, _);
          i += l.written, n = r(n, c, i, 1) >>> 0;
        }
        return f = i, n;
      }
      let g = null;
      function x() {
        return (g === null || g.buffer.detached === true || g.buffer.detached === void 0 && g.buffer !== s.memory.buffer) && (g = new DataView(s.memory.buffer)), g;
      }
      function T(e) {
        return e == null;
      }
      function D(e) {
        const t = typeof e;
        if (t == "number" || t == "boolean" || e == null) return `${e}`;
        if (t == "string") return `"${e}"`;
        if (t == "symbol") {
          const n = e.description;
          return n == null ? "Symbol" : `Symbol(${n})`;
        }
        if (t == "function") {
          const n = e.name;
          return typeof n == "string" && n.length > 0 ? `Function(${n})` : "Function";
        }
        if (Array.isArray(e)) {
          const n = e.length;
          let o = "[";
          n > 0 && (o += D(e[0]));
          for (let i = 1; i < n; i++) o += ", " + D(e[i]);
          return o += "]", o;
        }
        const r = /\[object ([^\]]+)\]/.exec(toString.call(e));
        let c;
        if (r && r.length > 1) c = r[1];
        else return toString.call(e);
        if (c == "Object") try {
          return "Object(" + JSON.stringify(e) + ")";
        } catch {
          return "Object";
        }
        return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : c;
      }
      function Z() {
        return s.generate_rsa_keypair_pem();
      }
      function R(e, t) {
        let r, c;
        try {
          const n = b(e, s.__wbindgen_malloc, s.__wbindgen_realloc), o = f, i = b(t, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f, l = s.rsa_encrypt_base64(n, o, i, _);
          return r = l[0], c = l[1], w(l[0], l[1]);
        } finally {
          s.__wbindgen_free(r, c, 1);
        }
      }
      function Q(e) {
        const t = s.__wbindgen_export_2.get(e);
        return s.__externref_table_dealloc(e), t;
      }
      function U(e, t) {
        let r, c;
        try {
          const i = b(e, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f, l = b(t, s.__wbindgen_malloc, s.__wbindgen_realloc), G = f, v = s.rsa_decrypt_base64(i, _, l, G);
          var n = v[0], o = v[1];
          if (v[3]) throw n = 0, o = 0, Q(v[2]);
          return r = n, c = o, w(n, o);
        } finally {
          s.__wbindgen_free(r, c, 1);
        }
      }
      function Y(e) {
        return e.buffer;
      }
      function ee() {
        return h(function(e, t) {
          return e.call(t);
        }, arguments);
      }
      function te() {
        return h(function(e, t, r) {
          return e.call(t, r);
        }, arguments);
      }
      function ne(e) {
        return e.crypto;
      }
      function re(e) {
        console.error(e);
      }
      function ce(e, t) {
        let r, c;
        try {
          r = e, c = t, console.error(w(e, t));
        } finally {
          s.__wbindgen_free(r, c, 1);
        }
      }
      function oe() {
        return h(function(e, t) {
          e.getRandomValues(t);
        }, arguments);
      }
      function ie(e) {
        return e.msCrypto;
      }
      function ae() {
        return new Object();
      }
      function se() {
        return new Error();
      }
      function _e(e) {
        return new Uint8Array(e);
      }
      function de(e, t) {
        return new Function(w(e, t));
      }
      function le(e, t, r) {
        return new Uint8Array(e, t >>> 0, r >>> 0);
      }
      function ue(e) {
        return new Uint8Array(e >>> 0);
      }
      function fe(e) {
        return e.node;
      }
      function ye() {
        return Date.now();
      }
      function ge(e) {
        return e.process;
      }
      function be() {
        return h(function(e, t) {
          e.randomFillSync(t);
        }, arguments);
      }
      function pe() {
        return h(function() {
          return module.require;
        }, arguments);
      }
      function we(e, t, r) {
        e[t] = r;
      }
      function me(e, t, r) {
        e.set(t, r >>> 0);
      }
      function he(e, t) {
        const r = t.stack, c = b(r, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
        x().setInt32(e + 4 * 1, n, true), x().setInt32(e + 4 * 0, c, true);
      }
      function ve() {
        const e = typeof global > "u" ? null : global;
        return T(e) ? 0 : m(e);
      }
      function Ae() {
        const e = typeof globalThis > "u" ? null : globalThis;
        return T(e) ? 0 : m(e);
      }
      function Ee() {
        const e = typeof self > "u" ? null : self;
        return T(e) ? 0 : m(e);
      }
      function Se() {
        const e = typeof window > "u" ? null : window;
        return T(e) ? 0 : m(e);
      }
      function xe(e, t, r) {
        return e.subarray(t >>> 0, r >>> 0);
      }
      function Le(e) {
        return e.versions;
      }
      function Te(e, t) {
        const r = D(t), c = b(r, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
        x().setInt32(e + 4 * 1, n, true), x().setInt32(e + 4 * 0, c, true);
      }
      function ke() {
        const e = s.__wbindgen_export_2, t = e.grow(4);
        e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
      }
      function Be(e) {
        return typeof e == "function";
      }
      function Ve(e) {
        const t = e;
        return typeof t == "object" && t !== null;
      }
      function Ie(e) {
        return typeof e == "string";
      }
      function Oe(e) {
        return e === void 0;
      }
      function De() {
        return s.memory;
      }
      function Re(e, t) {
        return w(e, t);
      }
      function Ce(e, t) {
        throw new Error(w(e, t));
      }
      URL = globalThis.URL;
      const d = await P({
        "./vaultic_crypto_engine_bg.js": {
          __wbindgen_string_new: Re,
          __wbg_new_8a6f238a6ece86ea: se,
          __wbg_stack_0ed75d68575b0f3c: he,
          __wbg_error_7534b8e9a36f1ab4: ce,
          __wbindgen_is_object: Ve,
          __wbg_set_3807d5f0bfc24aa7: we,
          __wbg_crypto_574e78ad8b13b65f: ne,
          __wbg_process_dc0fbacc7c1c06f7: ge,
          __wbg_versions_c01dfd4722a88165: Le,
          __wbg_node_905d3e251edff8a2: fe,
          __wbindgen_is_string: Ie,
          __wbg_require_60cc747a6bc5215a: pe,
          __wbindgen_is_function: Be,
          __wbg_msCrypto_a61aeb35a24c1329: ie,
          __wbg_randomFillSync_ac0988aba3254290: be,
          __wbg_getRandomValues_b8f5dbd5f3995a9e: oe,
          __wbg_error_524f506f44df1645: re,
          __wbg_newnoargs_105ed471475aaf50: de,
          __wbg_call_672a4d21634d4a24: ee,
          __wbg_new_405e22f390576ce2: ae,
          __wbindgen_is_undefined: Oe,
          __wbg_call_7cccdd69e0791ae2: te,
          __wbg_now_807e54c39636c349: ye,
          __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: Ae,
          __wbg_static_accessor_SELF_37c5d418e4bf5819: Ee,
          __wbg_static_accessor_WINDOW_5de37043a91a9c40: Se,
          __wbg_static_accessor_GLOBAL_88a902d13a557d07: ve,
          __wbg_buffer_609cc3eee51ed158: Y,
          __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: le,
          __wbg_new_a12002a7f91c75be: _e,
          __wbg_set_65595bdd868b3009: me,
          __wbg_newwithlength_a381634e90c276d4: ue,
          __wbg_subarray_aa9065fa9dc5df96: xe,
          __wbindgen_debug_string: Te,
          __wbindgen_throw: Ce,
          __wbindgen_memory: De,
          __wbindgen_init_externref_table: ke
        }
      }, q), Me = d.memory, $e = d.generate_rsa_keypair_pem, Ke = d.rsa_encrypt_base64, Ue = d.rsa_decrypt_base64, Ne = d.wasm_init, We = d.__wbindgen_exn_store, Fe = d.__externref_table_alloc, je = d.__wbindgen_export_2, Ge = d.__wbindgen_free, qe = d.__wbindgen_malloc, Pe = d.__wbindgen_realloc, He = d.__externref_table_dealloc, N = d.__wbindgen_start, Je = Object.freeze(Object.defineProperty({
        __proto__: null,
        __externref_table_alloc: Fe,
        __externref_table_dealloc: He,
        __wbindgen_exn_store: We,
        __wbindgen_export_2: je,
        __wbindgen_free: Ge,
        __wbindgen_malloc: qe,
        __wbindgen_realloc: Pe,
        __wbindgen_start: N,
        generate_rsa_keypair_pem: $e,
        memory: Me,
        rsa_decrypt_base64: Ue,
        rsa_encrypt_base64: Ke,
        wasm_init: Ne
      }, Symbol.toStringTag, {
        value: "Module"
      }));
      H(Je);
      N();
      let u = null;
      const L = document.getElementById("message"), ze = document.getElementById("generate-keys"), k = document.getElementById("encrypt"), B = document.getElementById("decrypt"), C = document.getElementById("public-key"), M = document.getElementById("private-key"), V = document.getElementById("encrypted"), W = document.getElementById("decrypted"), O = document.getElementById("log"), F = document.getElementById("key-output"), j = document.getElementById("result-output"), p = document.getElementById("loading"), Xe = document.getElementById("copy-public-key"), Ze = document.getElementById("copy-private-key"), Qe = document.getElementById("copy-encrypted"), I = document.getElementById("reset");
      function a(e, t = "info") {
        const r = (/* @__PURE__ */ new Date()).toLocaleTimeString(), c = document.createElement("div");
        c.textContent = `[${r}] ${e}`, t === "success" ? c.className = "log-entry success" : t === "error" ? c.className = "log-entry error" : c.className = "log-entry info", O.appendChild(c), O.scrollTop = O.scrollHeight;
      }
      async function $(e, t) {
        try {
          await navigator.clipboard.writeText(e.value), a(t, "success");
        } catch (r) {
          a(`Failed to copy: ${r}`, "error");
        }
      }
      async function Ye() {
        try {
          p.classList.add("active"), a("Initializing Vaultic crypto engine..."), a("Generating RSA 2048-bit key pair with secure entropy..."), u = await Z(), C.value = u.public_pem, M.value = u.private_pem, F.classList.add("visible"), k.disabled = false, I.disabled = false, a(`Vaultic RSA public key generated (${u.public_pem.length} chars)`), a(`Vaultic RSA private key generated (${u.private_pem.length} chars)`), a("Key pairs include Vaultic's additional Marvin attack protections"), a("\u2705 Vaultic RSA key pair successfully generated!", "success");
        } catch (e) {
          a(`\u274C Error in Vaultic key generation: ${e.message}`, "error"), console.error("Complete error:", e);
        } finally {
          p.classList.remove("active");
        }
      }
      async function et(e, t) {
        const r = typeof t == "string" ? new TextEncoder().encode(t) : t;
        if (r.length <= 245) {
          if (typeof t == "string") return R(e, t);
          {
            const n = new TextDecoder().decode(t);
            return R(e, n);
          }
        } else {
          const n = await nt(e, r);
          return btoa(JSON.stringify({
            mode: "hybrid",
            iv: Array.from(n.iv),
            encryptedKey: n.encryptedAesKey,
            encryptedData: Array.from(new Uint8Array(n.encryptedData))
          }));
        }
      }
      async function tt(e, t) {
        try {
          const r = atob(t), c = JSON.parse(r);
          if (c.mode === "hybrid") {
            const n = await rt(e, {
              iv: new Uint8Array(c.iv),
              encryptedAesKey: c.encryptedKey,
              encryptedData: new Uint8Array(c.encryptedData)
            });
            return new TextDecoder().decode(n);
          }
        } catch {
        }
        return U(e, t);
      }
      async function nt(e, t) {
        const r = crypto.getRandomValues(new Uint8Array(32)), c = crypto.getRandomValues(new Uint8Array(12)), n = await window.crypto.subtle.importKey("raw", r, {
          name: "AES-GCM",
          length: 256
        }, false, [
          "encrypt"
        ]), o = await window.crypto.subtle.encrypt({
          name: "AES-GCM",
          iv: c
        }, n, t), i = btoa(String.fromCharCode.apply(null, r)), _ = R(e, i);
        return {
          encryptedData: o,
          iv: c,
          encryptedAesKey: _
        };
      }
      async function rt(e, t) {
        const r = U(e, t.encryptedAesKey), c = atob(r), n = new Uint8Array(c.length);
        for (let _ = 0; _ < c.length; _++) n[_] = c.charCodeAt(_);
        const o = await window.crypto.subtle.importKey("raw", n, {
          name: "AES-GCM",
          length: 256
        }, false, [
          "decrypt"
        ]), i = await window.crypto.subtle.decrypt({
          name: "AES-GCM",
          iv: t.iv
        }, o, t.encryptedData);
        return new Uint8Array(i);
      }
      async function ct() {
        try {
          if (!u) {
            a("\u26A0\uFE0F Please generate a Vaultic RSA key pair first", "error");
            return;
          }
          const e = L.value.trim();
          if (!e) {
            a("\u26A0\uFE0F Please enter a message to encrypt", "error"), L.focus();
            return;
          }
          p.classList.add("active"), a(`Vaultic engine encrypting message (${e.length} bytes)...`);
          const t = await et(u.public_pem, e);
          V.value = t, j.classList.add("visible"), B.disabled = false, t.length > 500 ? (a("\u2705 Message encrypted using Vaultic's hybrid RSA+AES encryption", "success"), a("Large data automatically handled with enterprise-grade security")) : a("\u2705 Message encrypted using Vaultic's direct RSA encryption", "success"), a("The message can now only be decrypted with the matching private key");
        } catch (e) {
          a(`\u274C Vaultic encryption error: ${e.message}`, "error"), console.error("Complete error:", e);
        } finally {
          p.classList.remove("active");
        }
      }
      async function ot() {
        try {
          if (!u) {
            a("\u26A0\uFE0F Please generate a Vaultic RSA key pair first", "error");
            return;
          }
          const e = V.value.trim();
          if (!e) {
            a("\u26A0\uFE0F No encrypted message to decrypt", "error");
            return;
          }
          p.classList.add("active"), a("Vaultic engine decrypting message...");
          try {
            const t = await tt(u.private_pem, e);
            W.value = t, a("\u2705 Vaultic decryption successful", "success"), L.value.trim() === t ? (a("\u2713 Cryptographic verification: Decrypted message matches the original", "success"), a("The encryption/decryption cycle is complete and verified")) : a("\u26A0\uFE0F Verification failed: Decrypted message differs from original", "error");
          } catch (t) {
            a(`\u274C Vaultic decryption failed: ${t.message}`, "error"), a("This could be due to data corruption or using the wrong private key", "error"), console.error("Decryption error details:", t);
          }
        } catch (e) {
          a(`\u274C Vaultic engine error: ${e.message}`, "error"), console.error("Complete error:", e);
        } finally {
          p.classList.remove("active");
        }
      }
      function it() {
        L.value = "", C.value = "", M.value = "", V.value = "", W.value = "", F.classList.remove("visible"), j.classList.remove("visible"), k.disabled = true, B.disabled = true, I.disabled = true, u = null, a("Vaultic demo reset. Ready for new encryption session.");
      }
      function y(e) {
        console.log(`[Vaultic Analytics] User performed: ${e}`);
      }
      ze.addEventListener("click", () => {
        Ye(), y("generate_keys");
      });
      k.addEventListener("click", () => {
        ct(), y("encrypt_message");
      });
      B.addEventListener("click", () => {
        ot(), y("decrypt_message");
      });
      I.addEventListener("click", () => {
        it(), y("reset_application");
      });
      Xe.addEventListener("click", () => {
        $(C, "Vaultic public key copied to clipboard"), y("copy_public_key");
      });
      Ze.addEventListener("click", () => {
        $(M, "Vaultic private key copied to clipboard"), y("copy_private_key");
      });
      Qe.addEventListener("click", () => {
        $(V, "Encrypted message copied to clipboard"), y("copy_encrypted_message");
      });
      a("Vaultic RSA Encryption Demo initialized.");
      a("Ready to demonstrate secure cryptography with vaultic-crypto-engine.");
      a("\u{1F449} Start by generating a new RSA key pair");
      k.disabled = true;
      B.disabled = true;
      I.disabled = true;
      const at = "0.1.3";
      a(`Running vaultic-crypto-engine-demo v${at}`);
    })();
  }
});
export default require_stdin();
