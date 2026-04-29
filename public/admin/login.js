(function () {
  const body = document.querySelector(".admin-shell-page") || document.body;
  const form = document.getElementById("login-form");
  const emailField = document.getElementById("login-email");
  const passwordField = document.getElementById("login-password");
  const message = document.getElementById("login-message");

  let supabaseClient;

  const setMessage = (text, tone) => {
    if (!message) return;
    message.textContent = text || "";
    message.dataset.tone = tone || "";
  };

  const fetchConfig = async () => {
    const response = await fetch("/api/public/config");
    if (!response.ok) {
      throw new Error("Configuration publique indisponible.");
    }
    return response.json();
  };

  const verifyAdmin = async (token) => {
    const response = await fetch("/api/admin/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Accès admin refusé.");
    }
    return payload;
  };

  const bootstrap = async () => {
    try {
      const config = await fetchConfig();
      if (!config.supabaseUrl || !config.supabaseAnonKey) {
        throw new Error("Variables Supabase publiques manquantes.");
      }

      supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);

      const { data } = await supabaseClient.auth.getSession();
      if (data.session?.access_token) {
        await verifyAdmin(data.session.access_token);
        window.location.replace("/admin");
        return;
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        setMessage("Connexion en cours...", "");

        const { data: authData, error } = await supabaseClient.auth.signInWithPassword({
          email: emailField.value.trim(),
          password: passwordField.value,
        });

        if (error || !authData.session?.access_token) {
          setMessage("E-mail ou mot de passe invalide.", "error");
          return;
        }

        try {
          await verifyAdmin(authData.session.access_token);
          window.location.replace("/admin");
        } catch (verifyError) {
          await supabaseClient.auth.signOut();
          setMessage(verifyError.message || "Accès admin refusé.", "error");
        }
      });

      body.dataset.state = "ready";
    } catch (error) {
      setMessage(error.message || "Impossible de charger la connexion admin.", "error");
      body.dataset.state = "ready";
    }
  };

  bootstrap();
})();
