import { siteConfig } from "@/lib/site";

const addressParameter = {
  name: "address",
  in: "path",
  required: true,
  schema: {
    type: "string",
    pattern: "^0x[a-fA-F0-9]{40}$"
  },
  description: "Public 42-character Hyperliquid wallet address."
};

export function buildOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: "HypeLens Public API",
      version: "0.1.0",
      description:
        "Read-only Hyperliquid wallet intelligence API for public wallet reports and CSV exports.",
      license: {
        name: "MIT",
        url: `${siteConfig.githubUrl}/blob/main/LICENSE`
      }
    },
    servers: [
      {
        url: "/"
      }
    ],
    paths: {
      "/api/wallet/{address}": {
        get: {
          summary: "Get a Hyperliquid wallet report",
          description:
            "Returns a normalized read-only report for public Hyperliquid wallet activity, visible fees, positions, top markets, warnings, and data-completeness signals.",
          parameters: [addressParameter],
          responses: {
            "200": {
              description: "Wallet report response.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["report"],
                    properties: {
                      report: {
                        $ref: "#/components/schemas/WalletReport"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              $ref: "#/components/responses/ErrorResponse"
            },
            "502": {
              $ref: "#/components/responses/ErrorResponse"
            }
          }
        }
      },
      "/api/wallet/{address}/export": {
        get: {
          summary: "Export a Hyperliquid wallet report as CSV",
          description:
            "Returns visible wallet activity as spreadsheet-safe CSV with data-completeness metadata and partial-data warnings.",
          parameters: [addressParameter],
          responses: {
            "200": {
              description: "CSV wallet export.",
              content: {
                "text/csv": {
                  schema: {
                    type: "string"
                  }
                }
              }
            },
            "400": {
              $ref: "#/components/responses/ErrorResponse"
            },
            "502": {
              $ref: "#/components/responses/ErrorResponse"
            }
          }
        }
      }
    },
    components: {
      responses: {
        ErrorResponse: {
          description: "Error response.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["error"],
                properties: {
                  error: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      },
      schemas: {
        DataWarning: {
          type: "object",
          required: ["source", "message"],
          properties: {
            source: {
              type: "string"
            },
            message: {
              type: "string"
            }
          }
        },
        WalletReport: {
          type: "object",
          required: [
            "address",
            "generatedAt",
            "totalVolumeUsd",
            "totalFeesUsd",
            "fillCount",
            "openOrderCount",
            "topMarkets",
            "positions",
            "recentFills",
            "flags",
            "dataWarnings",
            "dataCompleteness"
          ],
          properties: {
            address: {
              type: "string"
            },
            generatedAt: {
              type: "string",
              format: "date-time"
            },
            accountValueUsd: {
              type: ["number", "null"]
            },
            totalMarginUsedUsd: {
              type: ["number", "null"]
            },
            totalNotionalPositionUsd: {
              type: ["number", "null"]
            },
            totalVolumeUsd: {
              type: "number"
            },
            totalFeesUsd: {
              type: "number"
            },
            fillCount: {
              type: "integer"
            },
            openOrderCount: {
              type: "integer"
            },
            topMarkets: {
              type: "array",
              items: {
                type: "object"
              }
            },
            positions: {
              type: "array",
              items: {
                type: "object"
              }
            },
            recentFills: {
              type: "array",
              items: {
                type: "object"
              }
            },
            flags: {
              type: "array",
              items: {
                type: "object"
              }
            },
            dataWarnings: {
              type: "array",
              items: {
                type: "object",
                required: ["source", "message"],
                properties: {
                  source: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                }
              }
            },
            dataCompleteness: {
              type: "object",
              required: ["score", "availableSources", "missingSources"],
              properties: {
                score: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100
                },
                availableSources: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                missingSources: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
