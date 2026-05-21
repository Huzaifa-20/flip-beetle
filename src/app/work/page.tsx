import React from "react";
import { PROJECTS } from "@/data/projects";
import WorkListingClient from "./WorkListingClient";

export default function WorkPage() {
  return <WorkListingClient projects={PROJECTS} />;
}
