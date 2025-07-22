let isAnalyzing = false;
let emotionData = {
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    neutral: 0,
    fearful: 0
};

let moodHistory = [
    { day: 'Lun', emotion: 'happy', level: 65 },
    { day: 'Mar', emotion: 'neutral', level: 45 },
    { day: 'Mer', emotion: 'sad', level: 30 },
    { day: 'Jeu', emotion: 'happy', level: 80 },
    { day: 'Ven', emotion: 'surprised', level: 70 },
    { day: 'Sam', emotion: 'happy', level: 85 },
    { day: 'Dim', emotion: 'neutral', level: 50 }
];

const emotionRecommendations = {
    happy: [
        "🎉 Excellent ! Profitez de ce moment positif avec PAUSE",
        "📝 Notez ce qui vous rend heureux aujourd'hui",
        "🤝 Partagez votre bonne humeur avec vos collègues",
        "🌟 Votre énergie positive influence votre environnement professionnel"
    ],
    sad: [
        "🌱 La tristesse est temporaire, soyez bienveillant avec vous-même",
        "🎵 Écoutez de la musique qui vous réconforte",
        "🚶‍♀️ Une petite marche peut aider à changer d'état d'esprit",
        "💙 PAUSE vous accompagne dans ces moments difficiles"
    ],
    angry: [
        "🌬️ Respirez profondément 5 fois de suite avec la méthode PAUSE",
        "⏸️ Prenez une pause de 10 minutes",
        "💭 Identifiez la source de votre frustration",
        "🧘‍♂️ Utilisez nos techniques de relaxation express"
    ],
    surprised: [
        "✨ L'inattendu peut être une opportunité",
        "🎯 Restez ouvert aux nouvelles possibilités",
        "🧘‍♀️ Prenez un moment pour assimiler avec PAUSE",
        "🌟 Votre adaptabilité est une force"
    ],
    neutral: [
        "⚡ C'est le moment parfait pour être productif",
        "🎯 Fixez-vous un petit objectif motivant",
        "🌟 Cherchez quelque chose qui vous inspire",
        "📈 PAUSE peut vous aider à stimuler votre énergie"
    ],
    fearful: [
        "🛡️ Vous êtes en sécurité, respirez calmement",
        "💪 Rappelez-vous vos réussites passées",
        "🤝 N'hésitez pas à demander du soutien",
        "🌟 PAUSE vous donne les outils pour surmonter vos peurs"
    ]
};

const exercises = {
    happy: {
        title: "Méditation de Gratitude PAUSE",
        description: "Prenez 3 minutes pour apprécier ce moment de bonheur et ancrer cette émotion positive"
    },
    sad: {
        title: "Respiration Réconfortante PAUSE", 
        description: "Technique de respiration douce développée par PAUSE pour apaiser la tristesse"
    },
    angry: {
        title: "Relaxation Progressive PAUSE",
        description: "Méthode PAUSE pour relâcher les tensions musculaires étape par étape"
    },
    surprised: {
        title: "Ancrage au Présent PAUSE",
        description: "Exercice 5-4-3-2-1 adapté par PAUSE pour vous recentrer"
    },
    neutral: {
        title: "Activation Énergétique PAUSE",
        description: "Mouvements doux développés par PAUSE pour stimuler votre énergie"
    },
    fearful: {
        title: "Sécurisation Mentale PAUSE",
        description: "Visualisation apaisante PAUSE pour retrouver confiance en vous"
    }
};

function initApp() {
    updateMoodHistory();
    simulateInitialEmotion();
}

function startEmotionAnalysis() {
    isAnalyzing = true;
    document.getElementById('startCamera').style.display = 'none';
    document.getElementById('stopCamera').style.display = 'inline-block';
    document.getElementById('statusIndicator').textContent = '🔄 Analyse en cours...';
    document.getElementById('statusIndicator').className = 'status-indicator status-analyzing';
    
    // Simulation de l'activation de la caméra
    setTimeout(() => {
        document.getElementById('cameraPlaceholder').style.display = 'none';
        document.getElementById('cameraVideo').style.display = 'block';
        document.getElementById('emotionOverlay').style.display = 'block';
        
        // Simulation des points faciaux
        createFacialPoints();
        
        // Démarrer la simulation d'analyse
        startEmotionSimulation();
    }, 1000);
}

function stopEmotionAnalysis() {
    isAnalyzing = false;
    document.getElementById('startCamera').style.display = 'inline-block';
    document.getElementById('stopCamera').style.display = 'none';
    document.getElementById('statusIndicator').textContent = '📱 Caméra Inactive';
    document.getElementById('statusIndicator').className = 'status-indicator status-inactive';
    
    document.getElementById('cameraPlaceholder').style.display = 'flex';
    document.getElementById('cameraVideo').style.display = 'none';
    document.getElementById('emotionOverlay').style.display = 'none';
    
    clearFacialPoints();
}

function createFacialPoints() {
    const container = document.getElementById('facialPoints');
    container.innerHTML = '';
    
    // Simulation de points de détection faciale
    const points = [
        {x: 45, y: 30}, {x: 55, y: 30}, // Yeux
        {x: 50, y: 45}, // Nez
        {x: 42, y: 60}, {x: 50, y: 65}, {x: 58, y: 60}, // Bouche
        {x: 35, y: 25}, {x: 65, y: 25}, // Coins externes yeux
        {x: 50, y: 35}, // Centre front
        {x: 40, y: 50}, {x: 60, y: 50}, // Joues
    ];
    
    points.forEach((point, index) => {
        setTimeout(() => {
            const dot = document.createElement('div');
            dot.className = 'face-point';
            dot.style.left = point.x + '%';
            dot.style.top = point.y + '%';
            container.appendChild(dot);
        }, index * 100); // Animation séquentielle des points
    });
}

function clearFacialPoints() {
    document.getElementById('facialPoints').innerHTML = '';
}

function startEmotionSimulation() {
    if (!isAnalyzing) return;
    
    // Simulation d'analyse émotionnelle dynamique
    const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'fearful'];
    const primaryEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    // Réinitialiser les données
    Object.keys(emotionData).forEach(key => {
        emotionData[key] = Math.random() * 15; // Bruit de fond plus réaliste
    });
    
    // Émotion dominante avec variation naturelle
    emotionData[primaryEmotion] = 65 + Math.random() * 25;
    
    // Ajouter une émotion secondaire
    const secondaryEmotion = emotions.filter(e => e !== primaryEmotion)[Math.floor(Math.random() * 5)];
    emotionData[secondaryEmotion] = 25 + Math.random() * 20;
    
    updateEmotionDisplay();
    updateRecommendations(primaryEmotion);
    updateExercise(primaryEmotion);
    
    // Prochaine analyse dans 3-5 secondes (variation naturelle)
    setTimeout(startEmotionSimulation, 3000 + Math.random() * 2000);
}

function updateEmotionDisplay() {
    // Trouver l'émotion dominante
    const dominantEmotion = Object.keys(emotionData).reduce((a, b) => 
        emotionData[a] > emotionData[b] ? a : b
    );
    
    const confidence = Math.round(emotionData[dominantEmotion]);
    
    // Mettre à jour l'overlay
    const emotionIcons = {
        happy: '😊', sad: '😢', angry: '😠', 
        surprised: '😲', neutral: '😐', fearful: '😨'
    };
    
    const emotionNames = {
        happy: 'Joie', sad: 'Tristesse', angry: 'Colère',
        surprised: 'Surprise', neutral: 'Neutre', fearful: 'Peur'
    };
    
    document.getElementById('currentEmotion').textContent = 
        `${emotionIcons[dominantEmotion]} ${emotionNames[dominantEmotion]} détectée`;
    document.getElementById('confidenceFill').style.width = confidence + '%';
    document.getElementById('emotionConfidence').textContent = `Confiance: ${confidence}%`;
    
    // Mettre à jour les cartes d'émotions avec animation
    Object.keys(emotionData).forEach(emotion => {
        const percentage = Math.round(emotionData[emotion]);
        const levelElement = document.getElementById(emotion + 'Level');
        const percentageElement = document.getElementById(emotion + 'Percentage');
        
        // Animation progressive
        setTimeout(() => {
            levelElement.style.width = percentage + '%';
            percentageElement.textContent = percentage + '%';
        }, Math.random() * 500);
    });
}

function updateRecommendations(emotion) {
    const recommendations = emotionRecommendations[emotion];
    const container = document.getElementById('recommendationsList');
    
    container.innerHTML = '';
    recommendations.forEach((rec, index) => {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.textContent = rec;
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            container.appendChild(item);
            
            // Animation d'apparition
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 200);
    });
}

function updateExercise(emotion) {
    const exercise = exercises[emotion];
    const exerciseElement = document.getElementById('exerciseText');
    
    // Animation de changement
    exerciseElement.style.opacity = '0.5';
    setTimeout(() => {
        exerciseElement.innerHTML = 
            `<strong>${exercise.title}</strong><br>${exercise.description}`;
        exerciseElement.style.opacity = '1';
    }, 300);
}

function startExercise() {
    // Animation de feedback
    const button = document.getElementById('exerciseSuggestion');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {