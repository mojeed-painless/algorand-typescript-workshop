import { TestExecutionContext } from '@algorandfoundation/algorand-typescript-testing'
import { describe, expect, it } from 'vitest'
import { PersonalBank } from './contract.algo'

const githubHandle = "mojeed-paonless"

describe('PersonalBank contract', () => {
  const context = new TestExecutionContext()
  it('Deposits funds into the contract', () => {
    // Arrange
    const contract = context.contract.create(PersonalBank)
    const app = context.ledger.getApplicationForContract(contract)
    const depositAmount = context.any.uint64()
    const depositTxn = context.any.txn.payment({
      receiver: app.address,
      amount: depositAmount,
    })

    // Act
    const output = contract.deposit(depositTxn, githubHandle)

    console.log('output', output)
    console.log('depositAmount', depositAmount)
    // Assert
    expect(output.valueOf()).toBe(depositAmount.valueOf())
  })

  it('Withdraws funds from the contract', () => {
    // Arrange
    const contract = context.contract.create(PersonalBank)
    const app = context.ledger.getApplicationForContract(contract)
    const depositAmount = context.any.uint64()
    const depositTxn = context.any.txn.payment({
      receiver: app.address,
      amount: depositAmount,
    })

    // Act
    contract.deposit(depositTxn, githubHandle)
    const output = contract.withdraw()

    console.log('output', output)
    console.log('depositAmount', depositAmount)
    // Assert
    expect(output.valueOf()).toBe(depositAmount.valueOf())
  })
})
