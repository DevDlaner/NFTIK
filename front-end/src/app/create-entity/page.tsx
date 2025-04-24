"use client";

import React, { useState } from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@project-serum/anchor";
// Importez l'IDL de votre programme Anchor (assurez-vous d'avoir le fichier JSON correspondant)
import idl from "../../idl/ticketing.json";  // chemin d'exemple vers l'IDL généré

// Remplacez par l'ID de votre programme (PublicKey) déployé sur Devnet ou localnet
const PROGRAM_ID = new PublicKey("EvxctWNDziXiJgYq8aCzucvgqXTgHPQ24VsieVZkyLGX");

export default function CreateEntityPage() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();  // Anchor-compatible wallet (null si non connecté)
  const { publicKey } = useWallet();
  const [txStatus, setTxStatus] = useState<string | null>(null);

  const handleInitializeEntity = async () => {
    if (!wallet) {
      setTxStatus("Wallet non connecté.");
      return;
    }
    try {
      // Crée un provider Anchor avec le wallet connecté
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
      // Initialise le programme Anchor via l'IDL et l'ID du programme
      const program = new Program(idl as Idl, PROGRAM_ID, provider);
      // Appel de la méthode Anchor "initializeEntity"
      const txSignature = await program.methods
        .initializeEntity()            // ajoutez vos arguments si l'instruction en attend
        .accounts({
          // liste des comptes requis par le programme
          authority: publicKey,        // par exemple: le wallet initiateur en authority
          systemProgram: SystemProgram.programId,
          // ... tout autre compte PDAs ou data account nécessaire ...
        })
        .rpc();  // envoie la transaction signée par wallet

      console.log("Transaction envoyée, signature:", txSignature);
      setTxStatus(`✅ Transaction réussie: ${txSignature}`);
    } catch (error) {
      console.error(error);
      setTxStatus("❌ Erreur lors de la transaction.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Initialize Entity</h1>
      {publicKey ? (
        <button onClick={handleInitializeEntity}>
          Initialiser une entité via le programme Anchor
        </button>
      ) : (
        <p>Veuillez connecter votre wallet Phantom pour commencer.</p>
      )}
      {txStatus && <p>{txStatus}</p>}
    </div>
  );
}
