"use client";

import { createContext, useContext } from "react";
import { TIERS, type Tier } from "@/data/tiers";

/** The tier the flow is playing. Components outside a provider (e.g. the handoff deck) get the base tier. */
export const TierContext = createContext<Tier>(TIERS.standard);

export const useTier = () => useContext(TierContext);
