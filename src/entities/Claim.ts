export interface PagedClaimResult {
  page: number,
  total_pages: number,
  result: Claim[]
}

export interface Claim {
  evidence_type: number
  expiration_height: number
  from_address: string
  header: {
    app_public_key: string
    chain: string
    session_height: number
  }
  merkle_root: {
    merkleHash: string
    range: {
      lower: number
      upper: number
    }
  },
  total_proofs: number
}