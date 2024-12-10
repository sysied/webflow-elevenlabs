import * as ElevenLabs from '@11labs/client';

document.addEventListener('DOMContentLoaded', function () {
  const callButton = document.getElementById('callButton');
  let conversation;
  let animationInterval;
  let isCalling = false;

  async function startConversation() {
  try {
  // Request microphone permission
  await navigator.mediaDevices.getUserMedia({audio: true});

  // Start the conversation
  conversation = await ElevenLabs.Conversation.startSession({
  agentId: 'i2Rh7Mu7AoTemFDLsd0j', // Replace with your agent ID
  onConnect: () => {
  isCalling = true;
          animateButtonText();
},
  onDisconnect: () => {
  isCalling = false;
  clearInterval(animationInterval);
  callButton.textContent = 'Teste den generellen KI Assistenten';
},
  onError: (error) => {
  console.error('Error:', error);
  isCalling = false;
  clearInterval(animationInterval);
  callButton.textContent = 'Fehler aufgetreten. Erneut versuchen.';
},
  onModeChange: (mode) => {
  // Handle mode changes if necessary
},
});
} catch (error) {
  console.error('Failed to start conversation:', error);
  callButton.textContent = 'Mikrofonzugriff verweigert.';
}
}

  async function stopConversation() {
  if (conversation) {
  await conversation.endSession();
  conversation = null;
}
}

  function animateButtonText() {
  let dots = '';
  animationInterval = setInterval(() => {
  dots = dots.length < 3 ? dots + '.' : '';
  callButton.textContent = `Anruf läuft${dots} (Klicke zum Stoppen)`;
}, 500);
}

  callButton.addEventListener('click', () => {
  if (isCalling) {
  stopConversation();
} else {
  startConversation();
}
});
});
