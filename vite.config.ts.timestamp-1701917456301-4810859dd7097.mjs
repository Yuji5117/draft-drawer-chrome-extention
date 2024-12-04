// vite.config.ts
import { crx } from "file:///Users/yuji/my_projects/draft-drawer/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///Users/yuji/my_projects/draft-drawer/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/yuji/my_projects/draft-drawer/node_modules/vite/dist/node/index.js";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Draft Drawer",
  version: "1.0.0",
  background: {
    service_worker: "./src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.tsx"]
    }
  ],
  action: { default_popup: "index.html" },
  permissions: ["identity", "tabs"],
  content_security_policy: {
    extension_pages: "script-src 'self' ; object-src 'self'",
    sandbox: "sandbox allow-scripts; script-src 'self' https://apis.google.com https://www.gstatic.com https://www.googleapis.com https://securetoken.googleapis.com; object-src 'self'"
  },
  oauth2: {
    client_id: "559846429571-9rg0ahjt1bk437drci1o89i45btdmb6h.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/userinfo.email"]
  },
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkCly5X9GWq8g8gspI6ujBjOmwbnUZAes54zotxSKgBfPNSCBccDV4jJD/H93YBwkyBjc48kgyW1o3hKdHRsyeFLrdeKUX90ZRgf0+kdQZ9ksaWkHJ+W3KmvJL+oxRMy5MBhwiR5BsotWLPOiRkQvJbLVyA2eFMR1BpN3hQ73rS/IV4R7mbEeankMRMGayJvsYTfYhtaAFeLaPkN48SItI/6k5O52LyxNRmy6oDk5dy8EPuekq6evHlVs0bGt0rnKCOXkPgPAYExt2RMMhWCYJ9Ca4ND9NmuWJHR/nhEBS6Hn2WBkq95wXQRyNWKZ++svDxJWepZ9iYWg+jh9zPa8MwIDAQAB"
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default })],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy95dWppL215X3Byb2plY3RzL2RyYWZ0LWRyYXdlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3l1amkvbXlfcHJvamVjdHMvZHJhZnQtZHJhd2VyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95dWppL215X3Byb2plY3RzL2RyYWZ0LWRyYXdlci92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBcIi9zcmNcIixcbiAgICB9LFxuICB9LFxufSk7XG4iLCAie1xuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgXCJuYW1lXCI6IFwiRHJhZnQgRHJhd2VyXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcIi4vc3JjL2JhY2tncm91bmQvaW5kZXgudHNcIixcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxuICB9LFxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAge1xuICAgICAgXCJtYXRjaGVzXCI6IFtcIjxhbGxfdXJscz5cIl0sXG4gICAgICBcImpzXCI6IFtcInNyYy9jb250ZW50L2luZGV4LnRzeFwiXVxuICAgIH1cbiAgXSxcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJpZGVudGl0eVwiLCBcInRhYnNcIl0sXG4gIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgIFwiZXh0ZW5zaW9uX3BhZ2VzXCI6IFwic2NyaXB0LXNyYyAnc2VsZicgOyBvYmplY3Qtc3JjICdzZWxmJ1wiLFxuICAgIFwic2FuZGJveFwiOiBcInNhbmRib3ggYWxsb3ctc2NyaXB0czsgc2NyaXB0LXNyYyAnc2VsZicgaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20gaHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20gaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20gaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGVhcGlzLmNvbTsgb2JqZWN0LXNyYyAnc2VsZidcIlxuICB9LFxuICBcIm9hdXRoMlwiOiB7XG4gICAgXCJjbGllbnRfaWRcIjogXCI1NTk4NDY0Mjk1NzEtOXJnMGFoanQxYms0MzdkcmNpMW84OWk0NWJ0ZG1iNmguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBcInNjb3Blc1wiOiBbXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsXCJdXG4gIH0sXG4gIFwia2V5XCI6IFwiTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFrQ2x5NVg5R1dxOGc4Z3NwSTZ1akJqT213Ym5VWkFlczU0em90eFNLZ0JmUE5TQ0JjY0RWNGpKRC9IOTNZQndreUJqYzQ4a2d5VzFvM2hLZEhSc3llRkxyZGVLVVg5MFpSZ2YwK2tkUVo5a3NhV2tISitXM0ttdkpMK294Uk15NU1CaHdpUjVCc290V0xQT2lSa1F2SmJMVnlBMmVGTVIxQnBOM2hRNzNyUy9JVjRSN21iRWVhbmtNUk1HYXlKdnNZVGZZaHRhQUZlTGFQa040OFNJdEkvNms1TzUyTHl4TlJteTZvRGs1ZHk4RVB1ZWtxNmV2SGxWczBiR3Qwcm5LQ09Ya1BnUEFZRXh0MlJNTWhXQ1lKOUNhNE5EOU5tdVdKSFIvbmhFQlM2SG4yV0JrcTk1d1hRUnlOV0taKytzdkR4SldlcFo5aVlXZytqaDl6UGE4TXdJREFRQUJcIlxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLFdBQVc7QUFDbFQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9COzs7QUNGN0I7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFlBQWM7QUFBQSxJQUNaLGdCQUFrQjtBQUFBLElBQ2xCLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQjtBQUFBLE1BQ0UsU0FBVyxDQUFDLFlBQVk7QUFBQSxNQUN4QixJQUFNLENBQUMsdUJBQXVCO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFVLEVBQUUsZUFBaUIsYUFBYTtBQUFBLEVBQzFDLGFBQWUsQ0FBQyxZQUFZLE1BQU07QUFBQSxFQUNsQyx5QkFBMkI7QUFBQSxJQUN6QixpQkFBbUI7QUFBQSxJQUNuQixTQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsV0FBYTtBQUFBLElBQ2IsUUFBVSxDQUFDLGdEQUFnRDtBQUFBLEVBQzdEO0FBQUEsRUFDQSxLQUFPO0FBQ1Q7OztBRGxCQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUNwQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
