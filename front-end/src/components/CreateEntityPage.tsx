// frontend/src/components/CreateEntityPage.tsx
'use client';

import React, { useState } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, web3, utils, Idl } from '@coral-xyz/anchor';

export default function CreateEntityPage() {
  const wallet = useAnchorWallet();
  const { connect, connected } = useWallet();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleCreate = async () => {
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'http://127.0.0.1:8899';
    const programIdStr = process.env.NEXT_PUBLIC_PROGRAM_ID;

    console.log('🔥 NEXT_PUBLIC_SOLANA_RPC_URL =', rpcUrl);
    console.log('🔥 Program ID =', programIdStr);

    if (!wallet || !programIdStr) {
      setStatus('Wallet or Program ID missing.');
      return;
    }

    setStatus('Fetching IDL and sending transaction...');

    try {
      // 1) Load IDL dynamically from public folder
      const idl: Idl = await fetch('/idl/ticketing.json').then(res => {
        if (!res.ok) throw new Error(`Failed to load IDL: ${res.status}`);
        return res.json();
      });
      console.log('🔥 IDL loaded =', idl);

      // 2) Setup connection and provider
      const connection = new web3.Connection(rpcUrl, 'processed');
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());

      // 3) Instantiate program using IDL and provider
      const programId = new web3.PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
      const program = new Program(idl as Idl, provider);

      // 4) Derive PDA
      const [entityPda] = web3.PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode('entity'), wallet.publicKey.toBuffer()],
        program.programId
      );

      // 5) RPC call
      await program.methods
        .initializeEntity(name)
        .accounts({
          entity: entityPda,
          authority: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      setStatus(`✅ Entity created at ${entityPda.toBase58()}`);
    } catch (err: any) {
      console.error(err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 border rounded-lg p-6 shadow">
      {!connected ? (
        <button
          onClick={() => connect()}
          className="w-full py-2 bg-purple-600 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Entity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleCreate}
            disabled={!name}
            className="w-full py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            Create Entity
          </button>
          {status && <p className="text-sm">{status}</p>}
        </div>
      )}
    </div>
  );
}





// // frontend/src/components/CreateEntityPage.tsx
// 'use client';
// import React, { useState } from 'react';
// import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
// import { AnchorProvider, Program, web3, utils } from '@coral-xyz/anchor';

// export default function CreateEntityPage() {
//   const wallet = useAnchorWallet();
//   const { connect, connected } = useWallet();
//   const [name, setName] = useState('');
//   const [status, setStatus] = useState<string | null>(null);

//   const handleCreate = async () => {
//     // Debug logs
//     console.log('🔥 NEXT_PUBLIC_SOLANA_RPC_URL =', process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
//     const programId = process.env.NEXT_PUBLIC_PROGRAM_ID;
//     console.log('🔥 Program ID =', programId);

//     if (!wallet) {
//       setStatus('Please connect your wallet first.');
//       return;
//     }
//     setStatus('Fetching IDL and sending transaction...');

//     // 1) Load IDL dynamically from public folder
//     const idl = await fetch('/idl/ticketing.json').then(res => {
//       if (!res.ok) throw new Error(`Failed to load IDL: ${res.status}`);
//       return res.json();
//     });
//     console.log('🔥 IDL loaded =', idl);

//     // 2) Setup connection and provider
//     const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'http://127.0.0.1:8899';
//     const connection = new web3.Connection(rpcUrl, 'processed');
//     const provider = new AnchorProvider(connection, wallet, {});

//         // 3) Instantiate program using provider and dynamic IDL
//     const ProgramAny: any = Program;
//     const program = new ProgramAny(
//       provider,
//       idl
//     );

//     try {
//       // Derive PDA
//       const [entityPda] = web3.PublicKey.findProgramAddressSync(
//         [utils.bytes.utf8.encode('entity'), wallet.publicKey!.toBuffer()],
//         program.programId
//       );

//       // RPC call
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




// // frontend/src/components/CreateEntityPage.tsx
// 'use client';
// import React, { useState } from 'react';
// import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
// import { AnchorProvider, Program, web3, utils } from '@coral-xyz/anchor';

// // Import IDL JSON, handle CJS default export
// import idlJson from '../idl/ticketing.json';
// const idl = (idlJson as any).default ?? idlJson;

// export default function CreateEntityPage() {
//   const wallet = useAnchorWallet();
//   const { connect, connected } = useWallet();
//   const [name, setName] = useState('');
//   const [status, setStatus] = useState<string | null>(null);

//   const handleCreate = async () => {
//     // Debug logs
//     console.log('🔥 NEXT_PUBLIC_SOLANA_RPC_URL =', process.env.NEXT_PUBLIC_SOLANA_RPC_URL);
//     const programId = process.env.NEXT_PUBLIC_PROGRAM_ID;
//     console.log('🔥 Program ID =', programId);

//     if (!wallet) {
//       setStatus('Please connect your wallet first.');
//       return;
//     }
//     setStatus('Fetching IDL and sending transaction...');

//     // 1) Load IDL dynamically to avoid structuredClone errors
//     const idl = await fetch('/idl/ticketing.json').then(res => res.json());
//     console.log('🔥 IDL loaded =', idl);

//     // 2) Setup connection and provider
//     const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'http://127.0.0.1:8899';
//     const connection = new web3.Connection(rpcUrl, 'processed');
//     const provider = new AnchorProvider(connection, wallet, {});

//     // 3) Instantiate program
//         // 3) Instantiate program (bypass TS type issues)
//     const ProgramAny: any = Program;
//     const program = new ProgramAny(
//       idl,
//       new web3.PublicKey(programId!),
//       provider
//     );

//     try {
//       // Derive PDA
//       const [entityPda] = web3.PublicKey.findProgramAddressSync(
//         [utils.bytes.utf8.encode('entity'), wallet.publicKey!.toBuffer()],
//         program.programId
//       );

//       // RPC call
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




// // frontend/src/components/CreateEntityPage.tsx
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
