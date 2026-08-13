#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export PATH="$NVM_DIR/versions/node/v24.19.0/bin:$PATH"
exec npx next dev --port "${PORT:-3000}"
