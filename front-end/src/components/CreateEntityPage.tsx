'use client';

import React, { useState } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, web3, utils, Idl } from '@project-serum/anchor';

export default function CreateEntityPage() {
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleCreate = async () => {

    console.log("🔘 Bouton cliqué");

    
    if (!wallet) {
      setStatus('🔌 Connect your wallet first');
      return;
    }

    try {
      setStatus('📡 Sending transaction...');

      // 1. Charger l’IDL
    //   const idl: Idl = await fetch('/idl/ticketing-clean.json').then(res => res.json());
    //   console.log("🧩 Instructions keys:", idl.instructions?.map(i => i.name));
    //   for (const ix of idl.instructions) {
    //     if (!ix.name || !ix.accounts || !ix.args) {
    //       throw new Error(`❌ Mauvaise instruction détectée: ${JSON.stringify(ix)}`);
    //     }
    //   }

    console.log("AVANT CHARGEMENT IDL");
    const idlRaw = await fetch('/idl/ticketing-clean.json');
    const idl = await idlRaw.json();
    console.log(" IDL chargé:", idl);

    // Vérifie que le champ 'instructions' existe bien
    if (!idl.instructions || !Array.isArray(idl.instructions)) {
      throw new Error("❌ IDL mal formé: 'instructions' est manquant ou invalide.");
    }

      // 2. Créer le provider Anchor
      const connection = new web3.Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'processed');
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());

      // 3. Initialiser le programme
    //   const programId = new web3.PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
    //   const program = new Program(idl, programId, provider);
      const programId = new web3.PublicKey("EvxctWNDziXiJgYq8aCzucvgqXTgHPQ24VsieVZkyLGX");
      console.log('🛠 Création du programme avec :', { idl, programId, provider });
      const program = new Program(idl, programId, provider);

      // 4. Dériver la PDA
      const [entityPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('entity'), wallet.publicKey.toBuffer()],
        program.programId
      );

      // 5. Appel RPC
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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      {connected ? (
        <>
          <input
            type="text"
            placeholder="Entity Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleCreate}
            disabled={!name}
            className="w-full py-2 bg-purple-600 text-white rounded"
          >
            Create Entity
          </button>
        </>
      ) : (
        <p className="text-center text-red-500">Please connect your wallet.</p>
      )}
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
