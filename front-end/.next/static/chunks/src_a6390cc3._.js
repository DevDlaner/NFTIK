(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/idl/ticketing.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"address\":\"EvxctWNDziXiJgYq8aCzucvgqXTgHPQ24VsieVZkyLGX\",\"metadata\":{\"name\":\"ticketing\",\"version\":\"0.1.0\",\"spec\":\"0.1.0\",\"description\":\"Created with Anchor\"},\"instructions\":[{\"name\":\"create_event\",\"docs\":[\"Crée un événement rattaché à l'entity\"],\"discriminator\":[49,219,29,203,22,98,100,87],\"accounts\":[{\"name\":\"entity\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[101,110,116,105,116,121]},{\"kind\":\"account\",\"path\":\"authority\"}]}},{\"name\":\"event\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[101,118,101,110,116]},{\"kind\":\"account\",\"path\":\"entity\"},{\"kind\":\"arg\",\"path\":\"name\"}]}},{\"name\":\"authority\",\"writable\":true,\"signer\":true,\"relations\":[\"entity\"]},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"}],\"args\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"date\",\"type\":\"i64\"}]},{\"name\":\"initialize_entity\",\"docs\":[\"Initialise une Entity avec un nom\"],\"discriminator\":[155,99,169,121,248,156,61,132],\"accounts\":[{\"name\":\"entity\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[101,110,116,105,116,121]},{\"kind\":\"account\",\"path\":\"authority\"}]}},{\"name\":\"authority\",\"writable\":true,\"signer\":true},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"}],\"args\":[{\"name\":\"name\",\"type\":\"string\"}]},{\"name\":\"mint_ticket\",\"docs\":[\"Mint un NFT (ticket) pour un événement donné\"],\"discriminator\":[159,167,223,60,138,6,23,29],\"accounts\":[{\"name\":\"entity\",\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[101,110,116,105,116,121]},{\"kind\":\"account\",\"path\":\"authority\"}]},\"relations\":[\"event\"]},{\"name\":\"event\",\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[101,118,101,110,116]},{\"kind\":\"account\",\"path\":\"entity\"},{\"kind\":\"account\",\"path\":\"event.name\",\"account\":\"Event\"}]}},{\"name\":\"mint\",\"writable\":true,\"signer\":true},{\"name\":\"token_account\",\"writable\":true,\"signer\":true},{\"name\":\"recipient\"},{\"name\":\"authority\",\"writable\":true,\"signer\":true,\"relations\":[\"entity\"]},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"rent\",\"address\":\"SysvarRent111111111111111111111111111111111\"}],\"args\":[]}],\"accounts\":[{\"name\":\"Entity\",\"discriminator\":[46,157,161,161,254,46,79,24]},{\"name\":\"Event\",\"discriminator\":[125,192,125,158,9,115,152,233]}],\"types\":[{\"name\":\"Entity\",\"type\":{\"kind\":\"struct\",\"fields\":[{\"name\":\"authority\",\"type\":\"pubkey\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"bump\",\"type\":\"u8\"}]}},{\"name\":\"Event\",\"type\":{\"kind\":\"struct\",\"fields\":[{\"name\":\"entity\",\"type\":\"pubkey\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"date\",\"type\":\"i64\"},{\"name\":\"bump\",\"type\":\"u8\"}]}}]}"));}}),
"[project]/src/components/CreateEntityPage.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// frontend/src/components/CreateEntityPage.tsx
__turbopack_context__.s({
    "default": (()=>CreateEntityPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useAnchorWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@coral-xyz/anchor/dist/browser/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@coral-xyz/anchor/dist/browser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/node_modules/@solana/web3.js/lib/index.browser.esm.js [app-client] (ecmascript) <export * as web3>");
// Import IDL JSON, handle CJS default export
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$idl$2f$ticketing$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/idl/ticketing.json (json)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const idl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$idl$2f$ticketing$2e$json__$28$json$29$__["default"].default ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$idl$2f$ticketing$2e$json__$28$json$29$__["default"];
function CreateEntityPage() {
    _s();
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnchorWallet"])();
    const { connect, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCreate = async ()=>{
        // Debug logs
        console.log('🔥 NEXT_PUBLIC_SOLANA_RPC_URL =', ("TURBOPACK compile-time value", "http://127.0.0.1:8899"));
        const programId = ("TURBOPACK compile-time value", "EvxctWNDziXiJgYq8aCzucvgqXTgHPQ24VsieVZkyLGX");
        console.log('🔥 Program ID =', programId);
        if (!wallet) {
            setStatus('Please connect your wallet first.');
            return;
        }
        setStatus('Fetching IDL and sending transaction...');
        // 1) Load IDL dynamically to avoid structuredClone errors
        const idl = await fetch('/idl/ticketing.json').then((res)=>res.json());
        console.log('🔥 IDL loaded =', idl);
        // 2) Setup connection and provider
        const rpcUrl = ("TURBOPACK compile-time value", "http://127.0.0.1:8899") || 'http://127.0.0.1:8899';
        const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Connection(rpcUrl, 'processed');
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AnchorProvider"](connection, wallet, {});
        // 3) Instantiate program
        // 3) Instantiate program (bypass TS type issues)
        const ProgramAny = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Program"];
        const program = new ProgramAny(idl, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(programId), provider);
        try {
            // Derive PDA
            const [entityPda] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["utils"].bytes.utf8.encode('entity'),
                wallet.publicKey.toBuffer()
            ], program.programId);
            // RPC call
            await program.methods.initializeEntity(name).accounts({
                entity: entityPda,
                authority: wallet.publicKey,
                systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId
            }).rpc();
            setStatus(`Entity created at ${entityPda.toBase58()}`);
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto mt-8 border rounded-lg p-6 shadow",
        children: !connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>connect(),
            className: "w-full py-2 bg-purple-600 text-white rounded",
            children: "Connect Wallet"
        }, void 0, false, {
            fileName: "[project]/src/components/CreateEntityPage.tsx",
            lineNumber: 74,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "w-full p-2 border rounded",
                    placeholder: "Entity name",
                    value: name,
                    onChange: (e)=>setName(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/src/components/CreateEntityPage.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleCreate,
                    disabled: !name,
                    className: "w-full py-2 bg-purple-600 text-white rounded disabled:opacity-50",
                    children: "Create Entity"
                }, void 0, false, {
                    fileName: "[project]/src/components/CreateEntityPage.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: status
                }, void 0, false, {
                    fileName: "[project]/src/components/CreateEntityPage.tsx",
                    lineNumber: 95,
                    columnNumber: 22
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CreateEntityPage.tsx",
            lineNumber: 81,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CreateEntityPage.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
} // // frontend/src/components/CreateEntityPage.tsx
 // 'use client';
 // import React, { useState } from 'react';
 // import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
 // import { AnchorProvider, Program, web3, utils } from '@coral-xyz/anchor';
 // const idl = require('../idl/ticketing.json');
 // //import idl from '../idl/ticketing.json';
 // // import { Button } from './ui/button';
 // // import { Input } from './ui/input';
 // // import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
 // export default function CreateEntityPage() {
 //   const wallet = useAnchorWallet();
 //   const { connect, connected } = useWallet();
 //   const [name, setName] = useState('');
 //   const [status, setStatus] = useState<string | null>(null);
 //   const handleCreate = async () => {
 //     if (!wallet) {
 //       setStatus('Please connect your wallet first.');
 //       return;
 //     }
 //     setStatus('Sending transaction...');
 //     const connection = new web3.Connection(
 //       process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
 //       'processed'
 //     );
 //     const provider = new AnchorProvider(connection, wallet, {});
 //     const program = new Program(
 //       idl as any,
 //       new web3.PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!),
 //       provider
 //     );
 //     try {
 //       const [entityPda] = web3.PublicKey.findProgramAddressSync(
 //         [utils.bytes.utf8.encode('entity'), wallet.publicKey!.toBuffer()],
 //         program.programId
 //       );
 //       await program.methods
 //         .initializeEntity(name)
 //         .accounts({
 //           entity: entityPda,
 //           authority: wallet.publicKey!,
 //           systemProgram: web3.SystemProgram.programId,
 //         })
 //         .rpc();
 //       setStatus(`Entity created at ${entityPda.toBase58()}`);
 //     } catch (err: any) {
 //       console.error(err);
 //       setStatus(`Error: ${err.message}`);
 //     }
 //   };
 //   return (
 //     <div className="max-w-md mx-auto mt-8 border rounded-lg p-6 shadow">
 //       {!connected ? (
 //         <button
 //           onClick={() => connect()}
 //           className="w-full py-2 bg-purple-600 text-white rounded"
 //         >
 //           Connect Wallet
 //         </button>
 //       ) : (
 //         <div className="space-y-4">
 //           <input
 //             className="w-full p-2 border rounded"
 //             placeholder="Entity name"
 //             value={name}
 //             onChange={(e) => setName(e.target.value)}
 //           />
 //           <button
 //             onClick={handleCreate}
 //             disabled={!name}
 //             className="w-full py-2 bg-purple-600 text-white rounded disabled:opacity-50"
 //           >
 //             Create Entity
 //           </button>
 //           {status && <p className="text-sm">{status}</p>}
 //         </div>
 //       )}
 //     </div>
 //   );
 // }
_s(CreateEntityPage, "vkfPQcZaiDYE2ji1J+//athLR6c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnchorWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"]
    ];
});
_c = CreateEntityPage;
var _c;
__turbopack_context__.k.register(_c, "CreateEntityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/organization/register/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// frontend/src/app/organization/register/page.tsx
__turbopack_context__.s({
    "default": (()=>RegisterOrgRoute)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CreateEntityPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CreateEntityPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function RegisterOrgRoute() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CreateEntityPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/organization/register/page.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = RegisterOrgRoute;
var _c;
__turbopack_context__.k.register(_c, "RegisterOrgRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_a6390cc3._.js.map