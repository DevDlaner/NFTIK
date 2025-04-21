use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo};

// id unique du preogram
declare_id!("EvxctWNDziXiJgYq8aCzucvgqXTgHPQ24VsieVZkyLGX");

#[program]
pub mod ticketing {
    use super::*;

    /// Initialise une Entity avec un nom
    pub fn initialize_entity(
        ctx: Context<InitializeEntity>,
        name: String,
    ) -> Result<()> {
        let entity = &mut ctx.accounts.entity;
        entity.authority = *ctx.accounts.authority.key;
        entity.name = name;
        entity.bump = ctx.bumps.entity;
        Ok(())
    }

    /// Crée un événement rattaché à l'entity
    pub fn create_event(
        ctx: Context<CreateEvent>,
        name: String,
        date: i64, // timestamp unix
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        event.entity = ctx.accounts.entity.key();
        event.name = name;
        event.date = date;
        event.bump = ctx.bumps.event;
        Ok(())
    }

    /// Mint un NFT (ticket) pour un événement donné
    pub fn mint_ticket(ctx: Context<MintTicket>) -> Result<()> {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );
        token::mint_to(cpi_ctx, 1)?;
        Ok(())
    }
}

// ========== Contexts et comptes ==========

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeEntity<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + name.len() + 1,
        seeds = [b"entity", authority.key().as_ref()],
        bump
    )]
    pub entity: Account<'info, Entity>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(name: String, date: i64)]
pub struct CreateEvent<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [b"entity", authority.key().as_ref()],
        bump = entity.bump
    )]
    pub entity: Account<'info, Entity>,

    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + name.len() + 8 + 1,
        seeds = [b"event", entity.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub event: Account<'info, Event>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintTicket<'info> {
    #[account(
        has_one = authority,
        seeds = [b"entity", authority.key().as_ref()],
        bump = entity.bump
    )]
    pub entity: Account<'info, Entity>,

    #[account(
        has_one = entity,
        seeds = [b"event", entity.key().as_ref(), event.name.as_bytes()],
        bump = event.bump
    )]
    pub event: Account<'info, Event>,

    #[account(
        init,
        payer = authority,
        mint::decimals = 0,
        mint::authority = authority
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = recipient
    )]
    pub token_account: Account<'info, TokenAccount>,

    /// CHECK: Unchecked recipient account
    pub recipient: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

// ========== Données stockées ==========

#[account]
pub struct Entity {
    pub authority: Pubkey,
    pub name: String,
    pub bump: u8,
}

#[account]
pub struct Event {
    pub entity: Pubkey,
    pub name: String,
    pub date: i64,
    pub bump: u8,
}