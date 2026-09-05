import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalPanel({ output }) {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  // =========================
  // Create Terminal (Runs Once)
  // =========================
  useEffect(() => {
    if (xtermRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      convertEol: true,
      theme: {
        background: "#1e1e1e",
      },
    });

    const fitAddon = new FitAddon();

    fitAddonRef.current = fitAddon;

    terminal.loadAddon(fitAddon);

    terminal.open(terminalRef.current);

    fitAddon.fit();

    xtermRef.current = terminal;

    return () => {
      terminal.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  // =========================
  // Auto Resize
  // =========================
  useEffect(() => {
    const handleResize = () => {
      fitAddonRef.current?.fit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================
  // Update Output
  // =========================
  useEffect(() => {
    if (!xtermRef.current) return;

    xtermRef.current.clear();

    if (!output || output.trim() === "") {
      xtermRef.current.writeln("RealTime Collaborative IDE");
      xtermRef.current.writeln("");
      xtermRef.current.writeln("Terminal Ready...");
    } else {
      xtermRef.current.writeln(output);
    }

    // Always stay at the latest output
    xtermRef.current.scrollToBottom();

    // Recalculate size after content changes
    fitAddonRef.current?.fit();
  }, [output]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "220px",
        background: "#1e1e1e",
        overflow: "hidden",
      }}
    />
  );
}
