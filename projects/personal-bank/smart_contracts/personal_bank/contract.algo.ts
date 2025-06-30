import { abimethod, Contract, BoxRef, Bytes } from '@algorandfoundation/algorand-typescript'

export class PersonalBank extends Contract {
  /**
   * Creates a box named "github" and stores the GitHub handle in it
   * Only works if the box reference is declared in the transaction
   */
  @abimethod()
  public deposit(githubHandle: string) {
    const box = BoxRef({ key: 'github' })

    
    box.create({ size: 32 })

    
    box.replace(0, Bytes(githubHandle))
  }
}
