"use client";

import { useState, useEffect, useCallback } from "react";
import objectHash from "object-hash";

import SearchBar from "../components/SearchBar";
import SectorFilter from "../components/SectorFilter";
import RefreshButton from "../components/RefreshButton";
import LastUpdated from "../components/LastUpdated";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioTable from "../components/PortfolioTable";
import SectorSummary from "../components/SectorSummary";
import PortfolioTableSkeleton from "../components/PortfolioTableSkeleton";
import SectorSummarySkeleton from "../components/SectorSummarySkeleton";

import {
  fetchPortfolio,
  fetchSummary,
  fetchSectorSummary,
  refreshPrices,
} from "../utils/api";

import { useSocket } from "../utils/socket";
import { PortfolioItem, SectorSummaryItem, Summary } from "../types";

export default function Page() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const [sectorSummaryData, setSectorSummaryData] = useState<
    SectorSummaryItem[]
  >([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Store the hash of portfolioData to detect changes efficiently
  const [portfolioDataHash, setPortfolioDataHash] = useState<string>("");

  const socket = useSocket();

  // Enhanced loadData that optionally shows skeleton loader (loading)
  const loadData = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const [portfolio, summary, sectorSummary] = await Promise.all([
          fetchPortfolio({
            search,
            sector,
            sortKey: sortKey || "",
            sortOrder,
          }),
          fetchSummary(),
          fetchSectorSummary(),
        ]);
        setPortfolioData(portfolio);
        setSummaryData(summary);
        setSectorSummaryData(sectorSummary);

        // Update hash after new data set
        const newHash = objectHash(portfolio);
        setPortfolioDataHash(newHash);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [search, sector, sortKey, sortOrder]
  );

  // Initial load on mount or filtering/sorting change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compare hashes and update portfolio data only if changed on socket update
  useEffect(() => {
    if (!socket) return;

    function onPricesUpdated(updatedPortfolio: PortfolioItem[]) {
      const newHash = objectHash(updatedPortfolio);
      // console.log("hash",newHash,portfolioDataHash)
      if (newHash !== portfolioDataHash) {
        setLoading(true); // Show skeleton only if data changed
        setPortfolioData(updatedPortfolio);
        setPortfolioDataHash(newHash);

        // Refresh other related data silently without skeleton
        loadData(false).finally(() => setLoading(false));

        setLastUpdated(new Date());
      } else {
        // No data change, just update lastUpdated timestamp
        setLastUpdated(new Date());
      }
    }

    socket.on("pricesUpdated", onPricesUpdated);
    return () => {
      socket.off("pricesUpdated", onPricesUpdated);
    };
  }, [socket, portfolioDataHash, loadData]);

  // Refresh button handler
  async function onRefresh() {
    setRefreshing(true);
    try {
      await refreshPrices();
      setLastUpdated(new Date());
      await loadData(false);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }

  function onSortChange(columnKey: string) {
    if (sortKey === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(columnKey);
      setSortOrder("asc");
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="flex items-center justify-between py-16">
            <div>
              <h1>Portfolio Dashboard</h1>
              <p className="text-secondary">Made By Akshaykumar Patil</p>
            </div>
            <div className="flex items-center gap-16">
              <div className="status status--success">Live Data</div>
              <PortfolioSummary summary={summaryData} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <div className="container">
          <div id="portfolio">
            {/* Dashboard Controls */}
            <section className="dashboard-controls">
              <div className="controls-left">
                <SearchBar value={search} onChange={setSearch} />
                <SectorFilter selected={sector} onChange={setSector} />
              </div>
              <div className="controls-right">
                <RefreshButton onClick={onRefresh} loading={refreshing} />
                <LastUpdated lastUpdated={lastUpdated} />
              </div>
            </section>
          </div>

          {/* Conditional rendering */}
          {loading ? (
            <>
              <section className="card table-card">
                <div className="card__body p-0">
                  <PortfolioTableSkeleton />
                </div>
              </section>
              <aside>
                <SectorSummarySkeleton />
              </aside>
            </>
          ) : portfolioData.length === 0 ? (
            <p>No data found.</p>
          ) : (
            <>
              <section className="card table-card">
                <div className="card__body p-0">
                  <PortfolioTable
                    data={portfolioData}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                  />
                </div>
              </section>
              <aside>
                <SectorSummary data={sectorSummaryData} />
              </aside>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
