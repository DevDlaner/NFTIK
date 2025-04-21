import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Ticketing } from "../target/types/ticketing";
import { assert } from "chai";
import { getAccount } from "@solana/spl-token";

describe("ticketing program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Ticketing as Program<Ticketing>;

  // Generate PDAs
  const [entityPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("entity"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Creates an Entity", async () => {
    const name = "MyEntity";
    await program.methods
      .initializeEntity(name)
      .accounts({
        entity: entityPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the account and verify
    const entityAccount = await program.account.entity.fetch(entityPda);
    assert.equal(entityAccount.authority.toString(), provider.wallet.publicKey.toString());
    assert.equal(entityAccount.name, name);
  });

  it("Creates an Event", async () => {
    const eventName = "MyEvent";
    const date = new anchor.BN(Date.now());
    const [eventPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("event"), entityPda.toBuffer(), Buffer.from(eventName)],
      program.programId
    );

    await program.methods
      .createEvent(eventName, date)
      .accounts({
        entity: entityPda,
        event: eventPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Verify event account
    const eventAccount = await program.account.event.fetch(eventPda);
    assert.equal(eventAccount.entity.toString(), entityPda.toString());
    assert.equal(eventAccount.name, eventName);
    assert.ok(eventAccount.date.eq(date));
  });

  it("Mints a Ticket NFT", async () => {
    const eventName = "MyEvent";
    const [eventPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("event"), entityPda.toBuffer(), Buffer.from(eventName)],
      program.programId
    );

    const mintKeypair = anchor.web3.Keypair.generate();
    const tokenAccountKeypair = anchor.web3.Keypair.generate();
    const recipient = provider.wallet.publicKey;

    await program.methods
      .mintTicket()
      .accounts({
        entity: entityPda,
        event: eventPda,
        mint: mintKeypair.publicKey,
        tokenAccount: tokenAccountKeypair.publicKey,
        recipient,
        authority: provider.wallet.publicKey,
        tokenProgram: anchor.SPL_TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([mintKeypair, tokenAccountKeypair])
      .rpc();

    // Fetch the token account using SPL Token helper
    const tokenAccount = await getAccount(
      provider.connection,
      tokenAccountKeypair.publicKey
    );
    assert.equal(tokenAccount.amount, BigInt(1));
  });
});
