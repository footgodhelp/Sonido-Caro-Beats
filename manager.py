import os
import json
import tkinter as tk
from tkinter import filedialog, messagebox
import webbrowser

CONFIG_FILE = "config.json"


class SonidoCaroManager:

    def __init__(self, root):

        self.root = root
        self.root.title("SONIDO CARO MANAGER")
        self.root.geometry("900x650")
        self.root.configure(bg="#111111")
        self.root.resizable(False, False)

        self.project_path = self.load_project()

        self.create_ui()
        self.update_stats()

    # -------------------------
    # CONFIG
    # -------------------------

    def load_project(self):

        if os.path.exists(CONFIG_FILE):

            try:

                with open(CONFIG_FILE, "r", encoding="utf-8") as f:

                    data = json.load(f)

                    path = data.get("project_path")

                    if path and os.path.exists(path):
                        return path

            except:
                pass

        folder = filedialog.askdirectory(
            title="Selecciona Sonido-Caro-Beats"
        )

        if not folder:
            exit()

        with open(CONFIG_FILE, "w", encoding="utf-8") as f:

            json.dump(
                {"project_path": folder},
                f,
                indent=4
            )

        return folder

    def save_project(self, path):

        with open(CONFIG_FILE, "w", encoding="utf-8") as f:

            json.dump(
                {"project_path": path},
                f,
                indent=4
            )

    # -------------------------
    # PATHS
    # -------------------------

    def beats_folder(self):

        return os.path.join(
            self.project_path,
            "BEATS"
        )

    def portadas_folder(self):

        return os.path.join(
            self.project_path,
            "PORTADAS"
        )

    # -------------------------
    # UI
    # -------------------------

    def create_ui(self):

        title = tk.Label(
            self.root,
            text="SONIDO CARO",
            font=("Arial Black", 28),
            bg="#111111",
            fg="#D4AF37"
        )
        title.pack(pady=(25, 0))

        subtitle = tk.Label(
            self.root,
            text="MANAGER",
            font=("Arial", 16),
            bg="#111111",
            fg="white"
        )
        subtitle.pack()

        self.path_label = tk.Label(
            self.root,
            text=self.project_path,
            bg="#111111",
            fg="#AAAAAA",
            font=("Segoe UI", 9)
        )
        self.path_label.pack(pady=10)

        # Stats

        stats_frame = tk.Frame(
            self.root,
            bg="#1B1B1B",
            padx=15,
            pady=15
        )
        stats_frame.pack(
            fill="x",
            padx=25,
            pady=10
        )

        self.beats_count_label = tk.Label(
            stats_frame,
            text="🎵 Beats: 0",
            bg="#1B1B1B",
            fg="white",
            font=("Segoe UI", 12, "bold")
        )

        self.beats_count_label.pack()

        # Botones

        buttons = tk.Frame(
            self.root,
            bg="#111111"
        )

        buttons.pack(pady=20)

        self.create_button(
            buttons,
            "🎵 GENERAR CATÁLOGO",
            self.generar_catalogo
        )

        self.create_button(
            buttons,
            "📂 ABRIR BEATS",
            self.abrir_beats
        )

        self.create_button(
            buttons,
            "🖼 ABRIR PORTADAS",
            self.abrir_portadas
        )

        self.create_button(
            buttons,
            "🌐 ABRIR WEB",
            self.abrir_web
        )

        self.create_button(
            buttons,
            "🔄 ACTUALIZAR DATOS",
            self.update_stats
        )

        self.create_button(
            buttons,
            "⚙ CAMBIAR PROYECTO",
            self.cambiar_proyecto
        )

    def create_button(self, parent, text, command):

        btn = tk.Button(
            parent,
            text=text,
            command=command,
            width=35,
            height=2,
            bg="#D4AF37",
            fg="black",
            activebackground="#FFD700",
            font=("Segoe UI", 11, "bold"),
            relief="flat",
            cursor="hand2"
        )

        btn.pack(pady=7)

    # -------------------------
    # FUNCIONES
    # -------------------------

    def count_beats(self):

        beats_path = self.beats_folder()

        if not os.path.exists(beats_path):
            return 0

        total = 0

        for file in os.listdir(beats_path):

            if file.lower().endswith(
                (".wav", ".mp3")
            ):
                total += 1

        return total

    def update_stats(self):

        total = self.count_beats()

        self.beats_count_label.config(
            text=f"🎵 Beats: {total}"
        )

    def generar_catalogo(self):

        beats_path = self.beats_folder()

        if not os.path.exists(beats_path):

            messagebox.showerror(
                "Error",
                "No existe carpeta BEATS"
            )

            return

        catalogo = []

        for file in os.listdir(beats_path):

            if file.lower().endswith(
                (".wav", ".mp3")
            ):

                catalogo.append(
                    {
                        "title": os.path.splitext(file)[0],
                        "file": file
                    }
                )

        output = os.path.join(
            self.project_path,
            "beats.json"
        )

        with open(
            output,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                catalogo,
                f,
                indent=4,
                ensure_ascii=False
            )

        messagebox.showinfo(
            "Catálogo",
            f"Se generaron {len(catalogo)} beats."
        )

        self.update_stats()

    def abrir_beats(self):

        path = self.beats_folder()

        if os.path.exists(path):
            os.startfile(path)

    def abrir_portadas(self):

        path = self.portadas_folder()

        if os.path.exists(path):
            os.startfile(path)

    def abrir_web(self):

        index = os.path.join(
            self.project_path,
            "index.html"
        )

        if os.path.exists(index):

            webbrowser.open(index)

        else:

            messagebox.showerror(
                "Error",
                "No existe index.html"
            )

    def cambiar_proyecto(self):

        folder = filedialog.askdirectory()

        if not folder:
            return

        self.project_path = folder

        self.save_project(folder)

        self.path_label.config(
            text=folder
        )

        self.update_stats()

        messagebox.showinfo(
            "Proyecto",
            "Ruta actualizada."
        )


root = tk.Tk()

app = SonidoCaroManager(root)

root.mainloop()