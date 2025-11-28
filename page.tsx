"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WalletNav } from "@/components/wallet-nav"
import { PiBalanceCard } from "@/components/pi-balance-card"
import { UnifiedBalanceCard } from "@/components/unified-balance-card"
import { QuickActionButtons } from "@/components/quick-action-buttons"
import { TokenList } from "@/components/token-list"
import { RecentTransactions } from "@/components/recent-transactions"
import { BankIntegration } from "@/components/bank-integration"
import { SwapInterface } from "@/components/swap-interface"
import { MultiChainTransfer } from "@/components/multi-chain-transfer"
import { WalletKeysDialog } from "@/components/wallet-keys-dialog"
import { usePiWallet } from "@/lib/hooks/use-pi-wallet"
import { Settings, Bell, Wallet } from "lucide-react"

export default function WalletPage() {
  const {
    piBalance,
    tokenBalances,
    transactions,
    isConnected,
    piUser,
    totalBalance,
    totalDTLBalance,
    dtlByChain,
    disconnectPiWallet,
    connectPiWallet,
  } = usePiWallet()
  const [activeTab, setActiveTab] = useState("wallet")

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "swap":
        setActiveTab("swap")
        break
      case "bridge":
        setActiveTab("transfer")
        break
      default:
        console.log(`Quick action: ${action}`)
    }
  }

  return (
    <div className="min-h-screen pb-safe bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-2xl sm:text-3xl font-bold text-white">π</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-none">Piyra Wallet</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">Digital TL + Pi Network</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {!isConnected ? (
                <Button
                  onClick={connectPiWallet}
                  size="lg"
                  className="gap-2 sm:gap-3 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                >
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Connect Pi Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </Button>
              ) : (
                <>
                  <WalletKeysDialog piUser={piUser} />
                  <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-muted">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-muted">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <WalletNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl space-y-6 sm:space-y-8 lg:space-y-10">
        {activeTab === "wallet" && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <UnifiedBalanceCard totalDTL={totalDTLBalance} dtlByChain={dtlByChain} totalBalance={totalBalance} />
            <QuickActionButtons onAction={handleQuickAction} />
            <PiBalanceCard balance={piBalance} />

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Assets</h3>
              <TokenList tokens={tokenBalances} />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Recent Activity</h3>
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
        )}

        {activeTab === "swap" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
                Token Swap
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Exchange tokens via Pi Dex</p>
            </div>
            <SwapInterface />
          </div>
        )}

        {activeTab === "bank" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
                Bank Integration
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                Connect Turkish banks and withdraw DTL
              </p>
            </div>
            <BankIntegration />
          </div>
        )}

        {activeTab === "transfer" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
                Cross-Chain Transfer
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                Transfer assets across all blockchains
              </p>
            </div>
            <MultiChainTransfer />
          </div>
        )}
      </main>
    </div>
  )
}
