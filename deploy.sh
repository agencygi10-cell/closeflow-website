#!/usr/bin/env bash
# CloseFlow — script para crear el repo en GitHub y hacer el push.
# Uso: cd closeflow-website && bash deploy.sh
set -euo pipefail

GITHUB_USER="agencygi10-cell"
REPO_NAME="closeflow-website"
GITHUB_TOKEN="${GITHUB_TOKEN:-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}"

echo "==> Creando repositorio público $GITHUB_USER/$REPO_NAME ..."
HTTP_CODE=$(curl -s -o /tmp/gh_resp.json -w "%{http_code}" \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"CloseFlow System — landing page\",\"private\":false,\"has_issues\":true}")

if [ "$HTTP_CODE" = "201" ]; then
  echo "    ✓ Repo creado."
elif [ "$HTTP_CODE" = "422" ]; then
  echo "    ! El repo ya existe — continúo."
else
  echo "    ✗ Error creando el repo (HTTP $HTTP_CODE):"
  cat /tmp/gh_resp.json
  exit 1
fi

echo "==> Inicializando git ..."
if [ ! -d .git ]; then
  git init -b main >/dev/null
fi
git add -A
git -c user.email="agency.gi10@gmail.com" -c user.name="$GITHUB_USER" commit -m "Initial commit: CloseFlow landing page" >/dev/null || echo "    (sin cambios para commitear)"

echo "==> Configurando remote ..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"

echo "==> Push a main ..."
git push -u origin main

echo ""
echo "✅ Listo."
echo "    Repo:  https://github.com/$GITHUB_USER/$REPO_NAME"
echo "    Vercel: https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2F$GITHUB_USER%2F$REPO_NAME"
echo ""
echo "⚠  Recuerda revocar el token en GitHub > Settings > Developer settings > Personal access tokens."
