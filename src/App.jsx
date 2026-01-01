import React, { useState, useMemo, useEffect, useCallback, createContext, useContext } from 'react';
import TreeIllustration from './components/TreeIllustration';
import { playSuccessSound, playLevelUpSound } from './utils/sounds';

// ============================================
// LANGUAGE SYSTEM
// ============================================

const translations = {
  nl: {
    appName: 'GoodVibes',
    points: 'punten',
    today: 'Vandaag',
    deeds: 'Daden',
    todayDone: 'Vandaag gedaan',
    helpGrow: 'Help je boom groeien!',
    addFirst: 'Druk op + om een daad toe te voegen',
    yourTree: 'Jouw Boom',
    journey: 'Groeireis',
    journeySubtitle: 'Van zaadje tot legende',
    profile: 'Profiel',
    calendar: 'Kalender',
    level: 'Level',
    phase: 'Fase',
    toNext: 'punten tot',
    achievements: 'Prestaties',
    settings: 'Instellingen',
    language: 'Taal',
    newDeed: 'Nieuwe daad',
    whatDidYouDo: 'Wat heb je gedaan?',
    describeDeed: 'Beschrijf je goede daad...',
    category: 'Categorie',
    impact: 'Impact',
    howFelt: 'Hoe voelde het?',
    saveGrow: 'Opslaan & Groeien',
    stillNeeded: 'Nog',
    until: 'tot',
    maxLevel: 'Maximum niveau bereikt!',
    now: 'NU',
    home: 'Home',
    tree: 'Boom',
    nav_journey: 'Reis',
    weekdays: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
    months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    cat_social: 'Sociaal',
    cat_environment: 'Milieu',
    cat_health: 'Gezondheid',
    cat_creativity: 'Creativiteit',
    cat_kindness: 'Vriendelijkheid',
    cat_learning: 'Leren',
    cat_family: 'Familie',
    cat_work: 'Werk',
    cat_mindfulness: 'Mindfulness',
    cat_volunteer: 'Vrijwillig',
    cat_finance: 'Financieel',
    cat_pet: 'Huisdier',
    phase_begin: 'Begin',
    phase_growth: 'Groei',
    phase_bloom: 'Bloei',
    phase_wisdom: 'Wijsheid',
    phase_legend: 'Legende',
    stage_1: 'Zaadje', stage_2: 'Ontkiemend', stage_3: 'Eerste Scheut', stage_4: 'Kiemplant',
    stage_5: 'Jonge Plant', stage_6: 'Struikje', stage_7: 'Grote Struik', stage_8: 'Jonge Boom',
    stage_9: 'Bloeiende Boom', stage_10: 'Fruitboom', stage_11: 'Schaduwrijke Boom',
    stage_12: 'Eeuwenoude Boom', stage_13: 'Heilige Boom', stage_14: 'Boom des Levens',
    stage_15: 'Wereldboom', stage_16: 'Kosmische Boom',
    desc_1: 'Elk avontuur begint klein', desc_2: 'Iets magisch gebeurt', desc_3: 'Je doorbreekt de oppervlakte!',
    desc_4: 'Eerste echte blaadjes', desc_5: 'Wortels graven dieper', desc_6: 'Eerste zijtakken',
    desc_7: 'Vogels merken je op', desc_8: 'Je stam wordt sterker', desc_9: 'Vlinders komen op bezoek',
    desc_10: 'Je werk draagt vrucht', desc_11: 'Mensen zoeken rust bij jou', desc_12: 'Een wijze uil woont bij je',
    desc_13: 'Magie in de lucht', desc_14: 'Hemel en aarde verbonden', desc_15: 'Legendes over je verteld',
    desc_16: 'Je reikt tot de sterren',
    // Streak
    streak: 'Streak',
    dayStreak: 'dagen op rij',
    streakLost: 'Streak verloren! Begin opnieuw.',
    streakRecord: 'Record',
    keepGoing: 'Ga zo door!',
    // Notifications
    notifications: 'Meldingen',
    notificationTime: 'Herinneringstijd',
    // Onboarding
    onboardingWelcome: 'Welkom bij GoodVibes!',
    onboardingSubtitle: 'Laat je boom groeien door goede daden',
    onboardingStep1Title: 'Doe goede daden',
    onboardingStep1Desc: 'Help anderen, zorg voor het milieu, of werk aan jezelf',
    onboardingStep2Title: 'Verdien punten',
    onboardingStep2Desc: 'Elke daad levert punten op. Hoe groter de impact, hoe meer punten!',
    onboardingStep3Title: 'Groei je boom',
    onboardingStep3Desc: 'Je boom groeit mee met jouw goede daden. Van zaadje tot kosmische boom!',
    onboardingStep4Title: 'Houd je streak vast',
    onboardingStep4Desc: 'Doe elke dag een goede daad en bouw een streak op!',
    getStarted: 'Start je reis',
    next: 'Volgende',
    skip: 'Overslaan',
    // Level up
    levelUp: 'Level Up!',
    newLevel: 'Je bent nu',
    congratulations: 'Gefeliciteerd!',
    continue: 'Doorgaan',
    // Statistics
    statistics: 'Statistieken',
    thisWeek: 'Deze week',
    thisMonth: 'Deze maand',
    totalDeeds: 'Totaal daden',
    avgPerDay: 'Gem. per dag',
    bestDay: 'Beste dag',
    weeklyGoal: 'Weekdoel',
    monthlyProgress: 'Maandelijkse voortgang',
    deedsThisWeek: 'daden deze week',
    deedsThisMonth: 'daden deze maand',
    pointsThisWeek: 'punten deze week',
    pointsThisMonth: 'punten deze maand',
    // All Deeds
    allDeeds: 'Alle Daden',
    totalEarned: 'Totaal verdiend',
    noDeedsYet: 'Nog geen daden',
    startJourney: 'Begin je reis door een goede daad toe te voegen!',
    back: 'Terug',
    filterAll: 'Alles',
    sortNewest: 'Nieuwste eerst',
    sortOldest: 'Oudste eerst',
    // Data
    resetData: 'Data wissen',
    resetConfirm: 'Weet je zeker dat je alle data wilt wissen?',
    cancel: 'Annuleren',
    reset: 'Wissen',
    // Weather
    weather_sunny: 'Zonnig',
    weather_cloudy: 'Bewolkt', 
    weather_rainy: 'Regenachtig',
    weather_stormy: 'Stormachtig',
    weather_snowy: 'Sneeuw',
    weather_windy: 'Winderig',
    weather_hot: 'Hittegolf',
    weather_foggy: 'Mistig',
    weather_change: 'Het weer verandert...',
    // Contact/Message
    contact: 'Contact',
    sendMessage: 'Stuur bericht',
    contactUs: 'Neem contact op',
    yourName: 'Jouw naam',
    yourEmail: 'Jouw e-mail',
    message: 'Bericht',
    messagePlaceholder: 'Typ je bericht hier...',
    send: 'Verzenden',
    messageSent: 'Bericht verzonden!',
    messageError: 'Er ging iets mis. Probeer het opnieuw.',
    close: 'Sluiten',
    // Toast messages
    toast_deedAdded: 'Goede daad toegevoegd! 🌱',
    toast_levelUp: 'Level omhoog! 🎉',
    toast_streak3: '3 dagen streak! 🔥',
    toast_streak7: 'Week streak! 💪',
    toast_streak30: 'Maand streak! 🌟',
    toast_streak100: '100 dagen! Legende! 🏆',
    toast_motivational1: 'Kleine daden, grote impact! 💫',
    toast_motivational2: 'Volhouden loont! 🎯',
    toast_motivational3: 'Je inspireert anderen! ✨',
    toast_motivational4: 'Je bent op de goede weg! 🛤️',
    toast_motivational5: 'De wereld wordt mooier door jou! 🌍',
    toast_motivational6: 'Consistentie is de sleutel! 🔑',
    toast_motivational7: 'Positieve energie verspreiden! 🌈',
    toast_motivational8: 'Elke dag telt mee! 📅',
    // Achievements
    achievementsUnlocked: 'Prestaties ontgrendeld',
    achievementDetails: 'Prestatie Details',
    achievementLocked: 'Nog niet ontgrendeld',
    achievementLevel: 'Level Prestatie',
    achievementStreak: 'Streak Prestatie',
    achievementCategory: 'Categorie Prestatie',
    achievementMilestone: 'Mijlpaal Prestatie',
    achievementSpecial: 'Speciale Prestatie',
    // Level achievements
    achievement_level_1: 'Eerste Stap',
    achievement_level_2: 'Groei Begint',
    achievement_level_3: 'Eerste Scheut',
    achievement_level_4: 'Kiemplant',
    achievement_level_5: 'Jonge Plant',
    achievement_level_6: 'Struikje',
    achievement_level_7: 'Grote Struik',
    achievement_level_8: 'Jonge Boom',
    achievement_level_9: 'Bloeiende Boom',
    achievement_level_10: 'Fruitboom',
    achievement_level_11: 'Schaduwrijke Boom',
    achievement_level_12: 'Eeuwenoude Boom',
    achievement_level_13: 'Heilige Boom',
    achievement_level_14: 'Boom des Levens',
    achievement_level_15: 'Wereldboom',
    achievement_level_16: 'Kosmische Boom',
    // Streak achievements
    achievement_streak_3: 'Beginner Streak',
    achievement_streak_7: 'Week Warrior',
    achievement_streak_14: 'Two Week Champion',
    achievement_streak_30: 'Monthly Master',
    achievement_streak_60: 'Dedication Deity',
    achievement_streak_100: 'Century Streak',
    achievement_streak_365: 'Year Legend',
    // Category achievements (will be generated dynamically)
    achievement_social_5: 'Social Starter',
    achievement_social_10: 'Social Butterfly',
    achievement_social_25: 'Social Networker',
    achievement_social_50: 'Social Master',
    achievement_social_100: 'Social Legend',
    achievement_environment_5: 'Milieu Beginner',
    achievement_environment_10: 'Milieu Held',
    achievement_environment_25: 'Milieu Activist',
    achievement_environment_50: 'Milieu Meester',
    achievement_environment_100: 'Milieu Legende',
    achievement_health_5: 'Gezondheid Starter',
    achievement_health_10: 'Gezondheid Champion',
    achievement_health_25: 'Gezondheid Expert',
    achievement_health_50: 'Gezondheid Meester',
    achievement_health_100: 'Gezondheid Legende',
    achievement_creativity_5: 'Creativiteit Starter',
    achievement_creativity_10: 'Creatief Genie',
    achievement_creativity_25: 'Creativiteit Expert',
    achievement_creativity_50: 'Creativiteit Meester',
    achievement_creativity_100: 'Creativiteit Legende',
    achievement_kindness_5: 'Vriendelijkheid Starter',
    achievement_kindness_10: 'Vriendelijk Hart',
    achievement_kindness_25: 'Vriendelijkheid Expert',
    achievement_kindness_50: 'Vriendelijkheid Meester',
    achievement_kindness_100: 'Vriendelijkheid Legende',
    achievement_learning_5: 'Leren Starter',
    achievement_learning_10: 'Leergierig',
    achievement_learning_25: 'Leren Expert',
    achievement_learning_50: 'Leren Meester',
    achievement_learning_100: 'Leren Legende',
    achievement_family_5: 'Familie Starter',
    achievement_family_10: 'Familie Champion',
    achievement_family_25: 'Familie Expert',
    achievement_family_50: 'Familie Meester',
    achievement_family_100: 'Familie Legende',
    achievement_work_5: 'Werk Starter',
    achievement_work_10: 'Werk Champion',
    achievement_work_25: 'Werk Expert',
    achievement_work_50: 'Werk Meester',
    achievement_work_100: 'Werk Legende',
    achievement_mindfulness_5: 'Mindfulness Starter',
    achievement_mindfulness_10: 'Mindful Beginner',
    achievement_mindfulness_25: 'Mindfulness Expert',
    achievement_mindfulness_50: 'Mindfulness Master',
    achievement_mindfulness_100: 'Mindfulness Legende',
    achievement_volunteer_5: 'Vrijwilliger Starter',
    achievement_volunteer_10: 'Vrijwilliger Helper',
    achievement_volunteer_25: 'Vrijwilliger Expert',
    achievement_volunteer_50: 'Vrijwilliger Veteran',
    achievement_volunteer_100: 'Vrijwilliger Legende',
    achievement_finance_5: 'Financieel Starter',
    achievement_finance_10: 'Financieel Bewust',
    achievement_finance_25: 'Financieel Expert',
    achievement_finance_50: 'Financieel Meester',
    achievement_finance_100: 'Financieel Legende',
    achievement_pet_5: 'Huisdier Starter',
    achievement_pet_10: 'Huisdier Liefhebber',
    achievement_pet_25: 'Huisdier Expert',
    achievement_pet_50: 'Huisdier Meester',
    achievement_pet_100: 'Huisdier Legende',
    // Milestone achievements
    achievement_deeds_10: 'Eerste 10 Daden',
    achievement_deeds_25: '25 Daden Club',
    achievement_deeds_50: '50 Daden Meester',
    achievement_deeds_100: '100 Daden Legende',
    achievement_deeds_250: '250 Daden Expert',
    achievement_deeds_500: '500 Daden Champion',
    achievement_deeds_1000: '1000 Daden Legende',
    achievement_points_100: '100 Punten',
    achievement_points_250: '250 Punten',
    achievement_points_500: '500 Punten',
    achievement_points_1000: '1000 Punten',
    achievement_points_2500: '2500 Punten',
    achievement_points_5000: '5000 Punten',
    // Special achievements
    achievement_perfect_week: 'Perfecte Week',
    achievement_perfect_month: 'Perfecte Maand',
    achievement_category_diversity: 'Categorie Diversiteit',
    achievement_consistency: 'Consistentie',
    achievement_balanced_life: 'Gebalanceerd Leven',
    achievement_weekend_warrior: 'Weekend Warrior',
    achievement_high_impact: 'Hoge Impact',
    // Goals
    goals: 'Doelen',
    myGoals: 'Mijn Doelen',
    newGoal: 'Nieuw Doel',
    createGoal: 'Doel Aanmaken',
    goalType: 'Doel Type',
    goalTarget: 'Doel',
    goalPeriod: 'Periode',
    goalCategory: 'Categorie',
    goalProgress: 'Voortgang',
    goalCompleted: 'Voltooid',
    goalActive: 'Actief',
    goalExpired: 'Verlopen',
    goalDeadline: 'Deadline',
    goalType_deeds_week: 'Daden deze week',
    goalType_deeds_month: 'Daden deze maand',
    goalType_deeds_continuous: 'Totaal daden',
    goalType_points_week: 'Punten deze week',
    goalType_points_month: 'Punten deze maand',
    goalType_points_continuous: 'Totaal punten',
    goalType_category_week: 'Daden in categorie deze week',
    goalType_category_month: 'Daden in categorie deze maand',
    goalType_streak_target: 'Streak doel',
    goalPeriod_week: 'Week',
    goalPeriod_month: 'Maand',
    goalPeriod_continuous: 'Continu',
    goalCompletedToast: 'Doel voltooid! 🎉',
    goalHalfwayToast: '50% van je doel bereikt! 💪',
    noGoals: 'Nog geen doelen',
    createFirstGoal: 'Maak je eerste doel aan!',
    deleteGoal: 'Doel Verwijderen',
    deleteGoalConfirm: 'Weet je zeker dat je dit doel wilt verwijderen?',
  },
  en: {
    appName: 'GoodVibes',
    points: 'points',
    today: 'Today',
    deeds: 'Deeds',
    todayDone: 'Done today',
    helpGrow: 'Help your tree grow!',
    addFirst: 'Press + to add a deed',
    yourTree: 'Your Tree',
    journey: 'Growth Journey',
    journeySubtitle: 'From seed to legend',
    profile: 'Profile',
    calendar: 'Calendar',
    level: 'Level',
    phase: 'Phase',
    toNext: 'points to',
    achievements: 'Achievements',
    settings: 'Settings',
    language: 'Language',
    newDeed: 'New deed',
    whatDidYouDo: 'What did you do?',
    describeDeed: 'Describe your good deed...',
    category: 'Category',
    impact: 'Impact',
    howFelt: 'How did it feel?',
    saveGrow: 'Save & Grow',
    stillNeeded: 'Still',
    until: 'to',
    maxLevel: 'Maximum level reached!',
    now: 'NOW',
    home: 'Home',
    tree: 'Tree',
    nav_journey: 'Journey',
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    cat_social: 'Social',
    cat_environment: 'Environment',
    cat_health: 'Health',
    cat_creativity: 'Creativity',
    cat_kindness: 'Kindness',
    cat_learning: 'Learning',
    cat_family: 'Family',
    cat_work: 'Work',
    cat_mindfulness: 'Mindfulness',
    cat_volunteer: 'Volunteer',
    cat_finance: 'Finance',
    cat_pet: 'Pet Care',
    phase_begin: 'Beginning',
    phase_growth: 'Growth',
    phase_bloom: 'Bloom',
    phase_wisdom: 'Wisdom',
    phase_legend: 'Legend',
    stage_1: 'Seed', stage_2: 'Germinating', stage_3: 'First Sprout', stage_4: 'Seedling',
    stage_5: 'Young Plant', stage_6: 'Small Bush', stage_7: 'Large Bush', stage_8: 'Young Tree',
    stage_9: 'Blooming Tree', stage_10: 'Fruit Tree', stage_11: 'Shade Tree',
    stage_12: 'Ancient Tree', stage_13: 'Sacred Tree', stage_14: 'Tree of Life',
    stage_15: 'World Tree', stage_16: 'Cosmic Tree',
    desc_1: 'Every adventure starts small', desc_2: 'Something magical happens', desc_3: 'You break through!',
    desc_4: 'First real leaves', desc_5: 'Roots dig deeper', desc_6: 'First side branches',
    desc_7: 'Birds notice you', desc_8: 'Your trunk grows stronger', desc_9: 'Butterflies visit',
    desc_10: 'Your work bears fruit', desc_11: 'People seek rest by you', desc_12: 'A wise owl lives with you',
    desc_13: 'Magic in the air', desc_14: 'Heaven and earth connected', desc_15: 'Legends told about you',
    desc_16: 'You reach for the stars',
    // Streak
    streak: 'Streak',
    dayStreak: 'days in a row',
    streakLost: 'Streak lost! Start again.',
    streakRecord: 'Record',
    keepGoing: 'Keep going!',
    // Notifications
    notifications: 'Notifications',
    notificationTime: 'Reminder time',
    // Onboarding
    onboardingWelcome: 'Welcome to GoodVibes!',
    onboardingSubtitle: 'Grow your tree by doing good deeds',
    onboardingStep1Title: 'Do good deeds',
    onboardingStep1Desc: 'Help others, care for the environment, or work on yourself',
    onboardingStep2Title: 'Earn points',
    onboardingStep2Desc: 'Every deed earns points. The bigger the impact, the more points!',
    onboardingStep3Title: 'Grow your tree',
    onboardingStep3Desc: 'Your tree grows with your good deeds. From seed to cosmic tree!',
    onboardingStep4Title: 'Keep your streak',
    onboardingStep4Desc: 'Do a good deed every day and build your streak!',
    getStarted: 'Start your journey',
    next: 'Next',
    skip: 'Skip',
    // Level up
    levelUp: 'Level Up!',
    newLevel: 'You are now',
    congratulations: 'Congratulations!',
    continue: 'Continue',
    // Statistics
    statistics: 'Statistics',
    thisWeek: 'This week',
    thisMonth: 'This month',
    totalDeeds: 'Total deeds',
    avgPerDay: 'Avg. per day',
    bestDay: 'Best day',
    weeklyGoal: 'Weekly goal',
    monthlyProgress: 'Monthly progress',
    deedsThisWeek: 'deeds this week',
    deedsThisMonth: 'deeds this month',
    pointsThisWeek: 'points this week',
    pointsThisMonth: 'points this month',
    // All Deeds
    allDeeds: 'All Deeds',
    totalEarned: 'Total earned',
    noDeedsYet: 'No deeds yet',
    startJourney: 'Start your journey by adding a good deed!',
    back: 'Back',
    filterAll: 'All',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    // Data
    resetData: 'Reset data',
    resetConfirm: 'Are you sure you want to reset all data?',
    cancel: 'Cancel',
    reset: 'Reset',
    // Weather
    weather_sunny: 'Sunny',
    weather_cloudy: 'Cloudy',
    weather_rainy: 'Rainy',
    weather_stormy: 'Stormy',
    weather_snowy: 'Snowy',
    weather_windy: 'Windy',
    weather_hot: 'Heat wave',
    weather_foggy: 'Foggy',
    weather_change: 'Weather is changing...',
    // Contact/Message
    contact: 'Contact',
    sendMessage: 'Send message',
    contactUs: 'Contact us',
    yourName: 'Your name',
    yourEmail: 'Your email',
    message: 'Message',
    messagePlaceholder: 'Type your message here...',
    send: 'Send',
    messageSent: 'Message sent!',
    messageError: 'Something went wrong. Please try again.',
    close: 'Close',
    // Toast messages
    toast_deedAdded: 'Good deed added! 🌱',
    toast_levelUp: 'Level up! 🎉',
    toast_streak3: '3 day streak! 🔥',
    toast_streak7: 'Week streak! 💪',
    toast_streak30: 'Month streak! 🌟',
    toast_streak100: '100 days! Legend! 🏆',
    toast_motivational1: 'Small deeds, big impact! 💫',
    toast_motivational2: 'Persistence pays off! 🎯',
    toast_motivational3: 'You inspire others! ✨',
    toast_motivational4: 'You\'re on the right track! 🛤️',
    toast_motivational5: 'The world is more beautiful because of you! 🌍',
    toast_motivational6: 'Consistency is the key! 🔑',
    toast_motivational7: 'Spreading positive energy! 🌈',
    toast_motivational8: 'Every day matters! 📅',
    // Achievements
    achievementsUnlocked: 'Achievements Unlocked',
    achievementDetails: 'Achievement Details',
    achievementLocked: 'Not yet unlocked',
    achievementLevel: 'Level Achievement',
    achievementStreak: 'Streak Achievement',
    achievementCategory: 'Category Achievement',
    achievementMilestone: 'Milestone Achievement',
    achievementSpecial: 'Special Achievement',
    // Level achievements
    achievement_level_1: 'First Step',
    achievement_level_2: 'Growth Begins',
    achievement_level_3: 'First Sprout',
    achievement_level_4: 'Seedling',
    achievement_level_5: 'Young Plant',
    achievement_level_6: 'Small Bush',
    achievement_level_7: 'Large Bush',
    achievement_level_8: 'Young Tree',
    achievement_level_9: 'Blooming Tree',
    achievement_level_10: 'Fruit Tree',
    achievement_level_11: 'Shade Tree',
    achievement_level_12: 'Ancient Tree',
    achievement_level_13: 'Sacred Tree',
    achievement_level_14: 'Tree of Life',
    achievement_level_15: 'World Tree',
    achievement_level_16: 'Cosmic Tree',
    // Streak achievements
    achievement_streak_3: 'Beginner Streak',
    achievement_streak_7: 'Week Warrior',
    achievement_streak_14: 'Two Week Champion',
    achievement_streak_30: 'Monthly Master',
    achievement_streak_60: 'Dedication Deity',
    achievement_streak_100: 'Century Streak',
    achievement_streak_365: 'Year Legend',
    // Category achievements
    achievement_social_5: 'Social Starter',
    achievement_social_10: 'Social Butterfly',
    achievement_social_25: 'Social Networker',
    achievement_social_50: 'Social Master',
    achievement_social_100: 'Social Legend',
    achievement_environment_5: 'Environment Beginner',
    achievement_environment_10: 'Environment Hero',
    achievement_environment_25: 'Environment Activist',
    achievement_environment_50: 'Environment Master',
    achievement_environment_100: 'Environment Legend',
    achievement_health_5: 'Health Starter',
    achievement_health_10: 'Health Champion',
    achievement_health_25: 'Health Expert',
    achievement_health_50: 'Health Master',
    achievement_health_100: 'Health Legend',
    achievement_creativity_5: 'Creativity Starter',
    achievement_creativity_10: 'Creative Genius',
    achievement_creativity_25: 'Creativity Expert',
    achievement_creativity_50: 'Creativity Master',
    achievement_creativity_100: 'Creativity Legend',
    achievement_kindness_5: 'Kindness Starter',
    achievement_kindness_10: 'Kind Heart',
    achievement_kindness_25: 'Kindness Expert',
    achievement_kindness_50: 'Kindness Master',
    achievement_kindness_100: 'Kindness Legend',
    achievement_learning_5: 'Learning Starter',
    achievement_learning_10: 'Curious Learner',
    achievement_learning_25: 'Learning Expert',
    achievement_learning_50: 'Learning Master',
    achievement_learning_100: 'Learning Legend',
    achievement_family_5: 'Family Starter',
    achievement_family_10: 'Family Champion',
    achievement_family_25: 'Family Expert',
    achievement_family_50: 'Family Master',
    achievement_family_100: 'Family Legend',
    achievement_work_5: 'Work Starter',
    achievement_work_10: 'Work Champion',
    achievement_work_25: 'Work Expert',
    achievement_work_50: 'Work Master',
    achievement_work_100: 'Work Legend',
    achievement_mindfulness_5: 'Mindfulness Starter',
    achievement_mindfulness_10: 'Mindful Beginner',
    achievement_mindfulness_25: 'Mindfulness Expert',
    achievement_mindfulness_50: 'Mindfulness Master',
    achievement_mindfulness_100: 'Mindfulness Legend',
    achievement_volunteer_5: 'Volunteer Starter',
    achievement_volunteer_10: 'Volunteer Helper',
    achievement_volunteer_25: 'Volunteer Expert',
    achievement_volunteer_50: 'Volunteer Veteran',
    achievement_volunteer_100: 'Volunteer Legend',
    achievement_finance_5: 'Finance Starter',
    achievement_finance_10: 'Finance Aware',
    achievement_finance_25: 'Finance Expert',
    achievement_finance_50: 'Finance Master',
    achievement_finance_100: 'Finance Legend',
    achievement_pet_5: 'Pet Starter',
    achievement_pet_10: 'Pet Lover',
    achievement_pet_25: 'Pet Expert',
    achievement_pet_50: 'Pet Master',
    achievement_pet_100: 'Pet Legend',
    // Milestone achievements
    achievement_deeds_10: 'First 10 Deeds',
    achievement_deeds_25: '25 Deeds Club',
    achievement_deeds_50: '50 Deeds Master',
    achievement_deeds_100: '100 Deeds Legend',
    achievement_deeds_250: '250 Deeds Expert',
    achievement_deeds_500: '500 Deeds Champion',
    achievement_deeds_1000: '1000 Deeds Legend',
    achievement_points_100: '100 Points',
    achievement_points_250: '250 Points',
    achievement_points_500: '500 Points',
    achievement_points_1000: '1000 Points',
    achievement_points_2500: '2500 Points',
    achievement_points_5000: '5000 Points',
    // Special achievements
    achievement_perfect_week: 'Perfect Week',
    achievement_perfect_month: 'Perfect Month',
    achievement_category_diversity: 'Category Diversity',
    achievement_consistency: 'Consistency',
    achievement_balanced_life: 'Balanced Life',
    achievement_weekend_warrior: 'Weekend Warrior',
    achievement_high_impact: 'High Impact',
    // Goals
    goals: 'Goals',
    myGoals: 'My Goals',
    newGoal: 'New Goal',
    createGoal: 'Create Goal',
    goalType: 'Goal Type',
    goalTarget: 'Target',
    goalPeriod: 'Period',
    goalCategory: 'Category',
    goalProgress: 'Progress',
    goalCompleted: 'Completed',
    goalActive: 'Active',
    goalExpired: 'Expired',
    goalDeadline: 'Deadline',
    goalType_deeds_week: 'Deeds this week',
    goalType_deeds_month: 'Deeds this month',
    goalType_deeds_continuous: 'Total deeds',
    goalType_points_week: 'Points this week',
    goalType_points_month: 'Points this month',
    goalType_points_continuous: 'Total points',
    goalType_category_week: 'Deeds in category this week',
    goalType_category_month: 'Deeds in category this month',
    goalType_streak_target: 'Streak target',
    goalPeriod_week: 'Week',
    goalPeriod_month: 'Month',
    goalPeriod_continuous: 'Continuous',
    goalCompletedToast: 'Goal completed! 🎉',
    goalHalfwayToast: '50% of your goal reached! 💪',
    noGoals: 'No goals yet',
    createFirstGoal: 'Create your first goal!',
    deleteGoal: 'Delete Goal',
    deleteGoalConfirm: 'Are you sure you want to delete this goal?',
  }
};

const LanguageContext = createContext();
const useTranslation = () => {
  const { lang } = useContext(LanguageContext);
  return (key) => translations[lang][key] || key;
};

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

const ToastContext = createContext();

// Toast component - displays a single toast message
const Toast = ({ message, onClose, id }) => {
  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="animate-slide-in-right max-w-sm w-full">
      <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-200 px-4 py-3 flex items-center gap-3 animate-fade-in">
        <div className="flex-shrink-0 text-2xl">{message.emoji || '🌱'}</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{message.text}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Toast container - manages multiple toasts
const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-2 sm:right-4 z-50 space-y-2 pointer-events-none max-w-[calc(100%-1rem)] sm:max-w-sm">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast message={toast} onClose={removeToast} id={toast.id} />
        </div>
      ))}
    </div>
  );
};

// Hook to use toast functionality
const useToast = (lang) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((messageKey, emoji = null) => {
    const text = translations[lang]?.[messageKey] || translations['en']?.[messageKey] || messageKey;
    const newToast = {
      id: Date.now() + Math.random(),
      text,
      emoji: emoji || '🌱',
    };
    
    setToasts((prev) => [...prev, newToast]);
  }, [lang]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const STORAGE_KEYS = {
  DEEDS: 'goodvibes_deeds',
  SETTINGS: 'goodvibes_settings',
  STREAK: 'goodvibes_streak',
  ONBOARDING: 'goodvibes_onboarding_complete',
  LAST_LEVEL: 'goodvibes_last_level',
  LAST_NOTIFICATION: 'goodvibes_last_notification',
  ACHIEVEMENTS: 'goodvibes_achievements',
  GOALS: 'goodvibes_goals',
};

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

// ============================================
// STREAK CALCULATION
// ============================================

const calculateStreak = (deeds) => {
  if (deeds.length === 0) return { current: 0, record: 0, lastDate: null };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const deedDates = [...new Set(deeds.map(d => d.date))].sort((a, b) => new Date(b) - new Date(a));
  
  if (deedDates.length === 0) return { current: 0, record: 0, lastDate: null };
  
  const lastDeedDate = new Date(deedDates[0]);
  lastDeedDate.setHours(0, 0, 0, 0);
  
  const isActive = lastDeedDate.getTime() === today.getTime() || 
                   lastDeedDate.getTime() === yesterday.getTime();
  
  if (!isActive) {
    let record = 1, tempStreak = 1;
    for (let i = 1; i < deedDates.length; i++) {
      const curr = new Date(deedDates[i - 1]);
      const prev = new Date(deedDates[i]);
      const diffDays = Math.floor((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) { tempStreak++; record = Math.max(record, tempStreak); }
      else { tempStreak = 1; }
    }
    return { current: 0, record, lastDate: deedDates[0], streakBroken: true };
  }
  
  let currentStreak = 1;
  let checkDate = new Date(lastDeedDate);
  
  for (let i = 1; i < deedDates.length; i++) {
    checkDate.setDate(checkDate.getDate() - 1);
    const prevDate = new Date(deedDates[i]);
    prevDate.setHours(0, 0, 0, 0);
    if (prevDate.getTime() === checkDate.getTime()) { currentStreak++; }
    else { break; }
  }
  
  const savedStreak = loadFromStorage(STORAGE_KEYS.STREAK, { record: 0 });
  const record = Math.max(currentStreak, savedStreak.record);
  
  return { current: currentStreak, record, lastDate: deedDates[0], streakBroken: false };
};

// ============================================
// NOTIFICATION HELPERS
// ============================================

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Send a notification with a motivational message
const sendNotification = (lang) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const messages = {
    nl: {
      title: '🌱 GoodVibes Herinnering',
      body: 'Tijd voor een goede daad! Laat je boom groeien 🌳',
    },
    en: {
      title: '🌱 GoodVibes Reminder',
      body: 'Time for a good deed! Help your tree grow 🌳',
    },
  };

  const message = messages[lang] || messages.en;

  try {
    new Notification(message.title, {
      body: message.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'goodvibes-daily-reminder', // Prevents duplicate notifications
      requireInteraction: false,
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};

// Check if it's time to send notification
const shouldSendNotification = (notificationTime, lastNotificationDate) => {
  const now = new Date();
  const [hours, minutes] = notificationTime.split(':').map(Number);
  
  // Create target time for today
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0, 0);
  
  // Check if we haven't sent a notification today yet
  const today = now.toDateString();
  const lastNotification = lastNotificationDate ? new Date(lastNotificationDate).toDateString() : null;
  
  // If we already sent a notification today, don't send another
  if (today === lastNotification) {
    return false;
  }
  
  // Check if current time has passed the notification time (with a 5-minute window)
  // This allows the notification to be sent even if the check runs slightly after the target time
  const timeDiff = now - targetTime;
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  // Send notification if we're past the target time but within 5 minutes
  // This ensures we catch the notification even if the check runs a bit late
  return timeDiff >= 0 && timeDiff <= fiveMinutes;
};

// ============================================
// DATA & CONFIG  
// ============================================

const CATEGORIES = [
  { id: 'social', nameKey: 'cat_social', emoji: '👥', color: '#4A90D9', defaultPoints: 2 },
  { id: 'environment', nameKey: 'cat_environment', emoji: '🌱', color: '#2D9B83', defaultPoints: 2 },
  { id: 'health', nameKey: 'cat_health', emoji: '💪', color: '#E8845F', defaultPoints: 2 },
  { id: 'creativity', nameKey: 'cat_creativity', emoji: '🎨', color: '#9B6DD9', defaultPoints: 2 },
  { id: 'kindness', nameKey: 'cat_kindness', emoji: '💝', color: '#D96D8C', defaultPoints: 1 },
  { id: 'learning', nameKey: 'cat_learning', emoji: '📚', color: '#6366F1', defaultPoints: 2 },
  { id: 'family', nameKey: 'cat_family', emoji: '👨‍👩‍👧‍👦', color: '#F59E0B', defaultPoints: 2 },
  { id: 'work', nameKey: 'cat_work', emoji: '💼', color: '#64748B', defaultPoints: 2 },
  { id: 'mindfulness', nameKey: 'cat_mindfulness', emoji: '🧘', color: '#14B8A6', defaultPoints: 2 },
  { id: 'volunteer', nameKey: 'cat_volunteer', emoji: '🤝', color: '#EC4899', defaultPoints: 3 },
  { id: 'finance', nameKey: 'cat_finance', emoji: '💰', color: '#22C55E', defaultPoints: 2 },
  { id: 'pet', nameKey: 'cat_pet', emoji: '🐾', color: '#A78BFA', defaultPoints: 1 },
];

const MOODS = ['😊', '🥰', '😌', '💪', '🌟', '🙏', '🎉', '🌈'];

const STAGES = [
  { level: 1, nameKey: 'stage_1', min: 0, descKey: 'desc_1', phase: 'begin' },
  { level: 2, nameKey: 'stage_2', min: 15, descKey: 'desc_2', phase: 'begin' },
  { level: 3, nameKey: 'stage_3', min: 35, descKey: 'desc_3', phase: 'begin' },
  { level: 4, nameKey: 'stage_4', min: 60, descKey: 'desc_4', phase: 'begin' },
  { level: 5, nameKey: 'stage_5', min: 100, descKey: 'desc_5', phase: 'growth' },
  { level: 6, nameKey: 'stage_6', min: 150, descKey: 'desc_6', phase: 'growth' },
  { level: 7, nameKey: 'stage_7', min: 200, descKey: 'desc_7', phase: 'growth' },
  { level: 8, nameKey: 'stage_8', min: 275, descKey: 'desc_8', phase: 'growth' },
  { level: 9, nameKey: 'stage_9', min: 375, descKey: 'desc_9', phase: 'bloom' },
  { level: 10, nameKey: 'stage_10', min: 475, descKey: 'desc_10', phase: 'bloom' },
  { level: 11, nameKey: 'stage_11', min: 600, descKey: 'desc_11', phase: 'bloom' },
  { level: 12, nameKey: 'stage_12', min: 750, descKey: 'desc_12', phase: 'wisdom' },
  { level: 13, nameKey: 'stage_13', min: 925, descKey: 'desc_13', phase: 'wisdom' },
  { level: 14, nameKey: 'stage_14', min: 1150, descKey: 'desc_14', phase: 'legend' },
  { level: 15, nameKey: 'stage_15', min: 1400, descKey: 'desc_15', phase: 'legend' },
  { level: 16, nameKey: 'stage_16', min: 1750, descKey: 'desc_16', phase: 'legend' },
];

const PHASES = {
  begin: { nameKey: 'phase_begin', color: '#90EE90', icon: '🌱' },
  growth: { nameKey: 'phase_growth', color: '#3CB371', icon: '🌿' },
  bloom: { nameKey: 'phase_bloom', color: '#FF69B4', icon: '🌸' },
  wisdom: { nameKey: 'phase_wisdom', color: '#DAA520', icon: '🦉' },
  legend: { nameKey: 'phase_legend', color: '#9370DB', icon: '✨' },
};

const getStage = (points) => STAGES.reduce((curr, s) => points >= s.min ? s : curr, STAGES[0]);
const getNextStage = (points) => STAGES.find(s => points < s.min) || null;
const getProgress = (points) => {
  const curr = getStage(points), next = getNextStage(points);
  return next ? ((points - curr.min) / (next.min - curr.min)) * 100 : 100;
};

// ============================================
// ACHIEVEMENTS SYSTEM
// ============================================

const ACHIEVEMENTS = {
  level: STAGES.map(s => ({
    id: `level_${s.level}`,
    level: s.level,
    nameKey: `achievement_level_${s.level}`,
    emoji: s.level <= 4 ? '🌱' : s.level <= 8 ? '🌿' : s.level <= 12 ? '🌳' : '✨',
    type: 'level'
  })),
  streak: [
    { id: 'streak_3', days: 3, nameKey: 'achievement_streak_3', emoji: '🔥', type: 'streak' },
    { id: 'streak_7', days: 7, nameKey: 'achievement_streak_7', emoji: '💪', type: 'streak' },
    { id: 'streak_14', days: 14, nameKey: 'achievement_streak_14', emoji: '⭐', type: 'streak' },
    { id: 'streak_30', days: 30, nameKey: 'achievement_streak_30', emoji: '🌟', type: 'streak' },
    { id: 'streak_60', days: 60, nameKey: 'achievement_streak_60', emoji: '🏆', type: 'streak' },
    { id: 'streak_100', days: 100, nameKey: 'achievement_streak_100', emoji: '💎', type: 'streak' },
    { id: 'streak_365', days: 365, nameKey: 'achievement_streak_365', emoji: '👑', type: 'streak' },
  ],
  category: (() => {
    const categoryAchievements = [];
    const counts = [5, 10, 25, 50, 100];
    CATEGORIES.forEach(cat => {
      counts.forEach(count => {
        categoryAchievements.push({
          id: `${cat.id}_${count}`,
          category: cat.id,
          count: count,
          nameKey: `achievement_${cat.id}_${count}`,
          emoji: cat.emoji,
          type: 'category'
        });
      });
    });
    return categoryAchievements;
  })(),
  milestone: [
    { id: 'deeds_10', type: 'deeds', count: 10, nameKey: 'achievement_deeds_10', emoji: '🌱' },
    { id: 'deeds_25', type: 'deeds', count: 25, nameKey: 'achievement_deeds_25', emoji: '🌿' },
    { id: 'deeds_50', type: 'deeds', count: 50, nameKey: 'achievement_deeds_50', emoji: '🌳' },
    { id: 'deeds_100', type: 'deeds', count: 100, nameKey: 'achievement_deeds_100', emoji: '🏅' },
    { id: 'deeds_250', type: 'deeds', count: 250, nameKey: 'achievement_deeds_250', emoji: '⭐' },
    { id: 'deeds_500', type: 'deeds', count: 500, nameKey: 'achievement_deeds_500', emoji: '🌟' },
    { id: 'deeds_1000', type: 'deeds', count: 1000, nameKey: 'achievement_deeds_1000', emoji: '👑' },
    { id: 'points_100', type: 'points', count: 100, nameKey: 'achievement_points_100', emoji: '💯' },
    { id: 'points_250', type: 'points', count: 250, nameKey: 'achievement_points_250', emoji: '🎯' },
    { id: 'points_500', type: 'points', count: 500, nameKey: 'achievement_points_500', emoji: '🏆' },
    { id: 'points_1000', type: 'points', count: 1000, nameKey: 'achievement_points_1000', emoji: '💎' },
    { id: 'points_2500', type: 'points', count: 2500, nameKey: 'achievement_points_2500', emoji: '✨' },
    { id: 'points_5000', type: 'points', count: 5000, nameKey: 'achievement_points_5000', emoji: '👑' },
  ],
  special: [
    {
      id: 'perfect_week',
      nameKey: 'achievement_perfect_week',
      emoji: '🌟',
      type: 'special',
      check: (deeds) => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        const weekDeeds = deeds.filter(d => new Date(d.date) >= startOfWeek);
        const uniqueDays = new Set(weekDeeds.map(d => d.date));
        return uniqueDays.size >= 7;
      }
    },
    {
      id: 'perfect_month',
      nameKey: 'achievement_perfect_month',
      emoji: '💫',
      type: 'special',
      check: (deeds) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthDeeds = deeds.filter(d => new Date(d.date) >= startOfMonth);
        const uniqueDays = new Set(monthDeeds.map(d => d.date));
        return uniqueDays.size >= 30;
      }
    },
    {
      id: 'category_diversity',
      nameKey: 'achievement_category_diversity',
      emoji: '🌈',
      type: 'special',
      check: (deeds) => {
        const uniqueCategories = new Set(deeds.map(d => d.category));
        return uniqueCategories.size >= CATEGORIES.length;
      }
    },
    {
      id: 'consistency',
      nameKey: 'achievement_consistency',
      emoji: '📅',
      type: 'special',
      check: (deeds) => {
        // Check if user has at least 5 deeds per week for 4 consecutive weeks
        const now = new Date();
        let consecutiveWeeks = 0;
        for (let i = 0; i < 4; i++) {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - (now.getDay() || 7) + 1 - (i * 7));
          weekStart.setHours(0, 0, 0, 0);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          const weekDeeds = deeds.filter(d => {
            const deedDate = new Date(d.date);
            return deedDate >= weekStart && deedDate <= weekEnd;
          });
          if (weekDeeds.length >= 5) {
            consecutiveWeeks++;
          } else {
            break;
          }
        }
        return consecutiveWeeks >= 4;
      }
    },
    {
      id: 'balanced_life',
      nameKey: 'achievement_balanced_life',
      emoji: '⚖️',
      type: 'special',
      check: (deeds) => {
        const categoryCounts = {};
        deeds.forEach(d => {
          categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
        });
        const categoriesWith3Plus = Object.values(categoryCounts).filter(count => count >= 3).length;
        return categoriesWith3Plus >= 5;
      }
    },
    {
      id: 'weekend_warrior',
      nameKey: 'achievement_weekend_warrior',
      emoji: '🎉',
      type: 'special',
      check: (deeds) => {
        const weekendDeeds = deeds.filter(d => {
          const date = new Date(d.date);
          const day = date.getDay();
          return day === 0 || day === 6; // Sunday or Saturday
        });
        return weekendDeeds.length >= 5;
      }
    },
    {
      id: 'high_impact',
      nameKey: 'achievement_high_impact',
      emoji: '💥',
      type: 'special',
      check: (deeds) => {
        const highImpactDeeds = deeds.filter(d => d.points >= 4);
        return highImpactDeeds.length >= 10;
      }
    },
  ]
};

// Flatten all achievements for easy access
const ALL_ACHIEVEMENTS = [
  ...ACHIEVEMENTS.level,
  ...ACHIEVEMENTS.streak,
  ...ACHIEVEMENTS.category,
  ...ACHIEVEMENTS.milestone,
  ...ACHIEVEMENTS.special
];

// Check which achievements are unlocked
const checkAchievements = (deeds, totalPoints, stage, streak) => {
  const unlocked = [];
  
  // Check level achievements
  unlocked.push(...ACHIEVEMENTS.level.filter(a => stage.level >= a.level));
  
  // Check streak achievements
  unlocked.push(...ACHIEVEMENTS.streak.filter(a => streak.current >= a.days));
  
  // Check category achievements
  CATEGORIES.forEach(cat => {
    const catDeeds = deeds.filter(d => d.category === cat.id);
    unlocked.push(...ACHIEVEMENTS.category.filter(a => 
      a.category === cat.id && catDeeds.length >= a.count
    ));
  });
  
  // Check milestone achievements
  unlocked.push(...ACHIEVEMENTS.milestone.filter(a => {
    if (a.type === 'deeds') return deeds.length >= a.count;
    if (a.type === 'points') return totalPoints >= a.count;
    return false;
  }));
  
  // Check special achievements
  unlocked.push(...ACHIEVEMENTS.special.filter(a => a.check(deeds)));
  
  // Remove duplicates and return unique achievements
  const uniqueUnlocked = Array.from(new Map(unlocked.map(a => [a.id, a])).values());
  return uniqueUnlocked;
};

// ============================================
// GOALS SYSTEM
// ============================================

// Helper functions for date calculations
const getStartOfWeek = () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  start.setHours(0, 0, 0, 0);
  return start.toISOString().split('T')[0];
};

const getEndOfWeek = () => {
  const start = new Date(getStartOfWeek());
  start.setDate(start.getDate() + 6);
  return start.toISOString().split('T')[0];
};

const getStartOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
};

const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
};

const isInWeek = (dateStr, weekStartStr) => {
  const date = new Date(dateStr);
  const weekStart = new Date(weekStartStr);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return date >= weekStart && date <= weekEnd;
};

const isInMonth = (dateStr, monthStartStr) => {
  const date = new Date(dateStr);
  const monthStart = new Date(monthStartStr);
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  return date >= monthStart && date <= monthEnd;
};

const isNewWeek = (endDateStr, now) => {
  const endDate = new Date(endDateStr);
  return now > endDate;
};

const isNewMonth = (endDateStr, now) => {
  const endDate = new Date(endDateStr);
  return now > endDate;
};

// Create a new goal
const createGoal = (type, target, category = null, period = 'week') => {
  const now = new Date();
  const startDate = period === 'week' ? getStartOfWeek() : period === 'month' ? getStartOfMonth() : now.toISOString().split('T')[0];
  const endDate = period === 'week' ? getEndOfWeek() : period === 'month' ? getEndOfMonth() : null;
  
  return {
    id: `goal_${Date.now()}`,
    type,
    target,
    current: 0,
    category,
    period,
    startDate,
    endDate,
    completed: false,
    completedDate: null,
    createdAt: now.toISOString()
  };
};

// Update goal progress
const updateGoalProgress = (goals, deeds, totalPoints, streak) => {
  return goals.map(goal => {
    if (goal.completed && goal.completedDate) return goal;
    
    let current = 0;
    const now = new Date();
    
    switch(goal.type) {
      case 'deeds_week':
        current = deeds.filter(d => isInWeek(d.date, goal.startDate)).length;
        break;
      case 'deeds_month':
        current = deeds.filter(d => isInMonth(d.date, goal.startDate)).length;
        break;
      case 'deeds_continuous':
        current = deeds.length;
        break;
      case 'points_week':
        current = deeds.filter(d => isInWeek(d.date, goal.startDate))
          .reduce((sum, d) => sum + d.points, 0);
        break;
      case 'points_month':
        current = deeds.filter(d => isInMonth(d.date, goal.startDate))
          .reduce((sum, d) => sum + d.points, 0);
        break;
      case 'points_continuous':
        current = totalPoints;
        break;
      case 'category_week':
        current = deeds.filter(d => 
          d.category === goal.category && isInWeek(d.date, goal.startDate)
        ).length;
        break;
      case 'category_month':
        current = deeds.filter(d => 
          d.category === goal.category && isInMonth(d.date, goal.startDate)
        ).length;
        break;
      case 'streak_target':
        current = streak.current;
        break;
      default:
        current = 0;
    }
    
    const completed = current >= goal.target;
    const wasCompleted = goal.completed;
    
    return {
      ...goal,
      current: Math.min(current, goal.target), // Cap at target
      completed,
      completedDate: completed && !wasCompleted ? now.toISOString() : goal.completedDate
    };
  });
};

// Auto-reset goals for new periods
const resetGoalsForNewPeriod = (goals) => {
  const now = new Date();
  return goals.map(goal => {
    if (goal.period === 'week' && goal.endDate && isNewWeek(goal.endDate, now)) {
      // Reset for new week
      return createGoal(goal.type, goal.target, goal.category, 'week');
    }
    if (goal.period === 'month' && goal.endDate && isNewMonth(goal.endDate, now)) {
      // Reset for new month
      return createGoal(goal.type, goal.target, goal.category, 'month');
    }
    return goal;
  });
};

// ============================================
// CATEGORY STATISTICS
// ============================================

const filterByPeriod = (deeds, period) => {
  if (period === 'all') return deeds;
  
  const now = new Date();
  let startDate;
  
  if (period === 'week') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    startDate.setHours(0, 0, 0, 0);
  } else if (period === 'month') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  return deeds.filter(d => new Date(d.date) >= startDate);
};

const getPreviousPeriod = (period) => {
  if (period === 'week') return 'previous_week';
  if (period === 'month') return 'previous_month';
  return 'all';
};

const filterByPreviousPeriod = (deeds, period) => {
  const now = new Date();
  let startDate, endDate;
  
  if (period === 'previous_week') {
    endDate = new Date(now);
    endDate.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    endDate.setHours(0, 0, 0, 0);
    startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === 'previous_month') {
    endDate = new Date(now.getFullYear(), now.getMonth(), 1);
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  } else {
    return deeds;
  }
  
  return deeds.filter(d => {
    const deedDate = new Date(d.date);
    return deedDate >= startDate && deedDate < endDate;
  });
};

// Calculate category statistics
const calculateCategoryStats = (deeds, period = 'all') => {
  const filteredDeeds = filterByPeriod(deeds, period);
  
  return CATEGORIES.map(category => {
    const categoryDeeds = filteredDeeds.filter(d => d.category === category.id);
    const categoryPoints = categoryDeeds.reduce((sum, d) => sum + d.points, 0);
    const avgPoints = categoryDeeds.length > 0 
      ? parseFloat((categoryPoints / categoryDeeds.length).toFixed(1))
      : 0;
    
    return {
      category: category.id,
      name: category.nameKey,
      emoji: category.emoji,
      color: category.color,
      count: categoryDeeds.length,
      points: categoryPoints,
      avgPoints: avgPoints,
      percentage: filteredDeeds.length > 0 
        ? parseFloat(((categoryDeeds.length / filteredDeeds.length) * 100).toFixed(1))
        : 0
    };
  }).filter(stat => stat.count > 0) // Only categories with deeds
    .sort((a, b) => b.count - a.count); // Sort by count
};

// Compare periods
const compareCategoryPeriods = (deeds, currentPeriod, previousPeriod) => {
  const current = calculateCategoryStats(deeds, currentPeriod);
  const previous = calculateCategoryStats(filterByPreviousPeriod(deeds, previousPeriod), 'all');
  
  return current.map(curr => {
    const prev = previous.find(p => p.category === curr.category);
    const change = prev && prev.count > 0
      ? parseFloat((((curr.count - prev.count) / prev.count) * 100).toFixed(1))
      : null;
    
    return {
      ...curr,
      previousCount: prev?.count || 0,
      change: change,
      trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable'
    };
  });
};

// Generate category insights
const generateCategoryInsights = (stats, comparison, lang, t) => {
  const insights = [];
  
  if (stats.length === 0) {
    insights.push(lang === 'nl' ? 'Begin met goede daden om statistieken te zien!' : 'Start doing good deeds to see statistics!');
    return insights;
  }
  
  // Most used category
  const topCategory = stats[0];
  insights.push(
    lang === 'nl' 
      ? `Je favoriete categorie is ${t(topCategory.name)} ${topCategory.emoji} met ${topCategory.count} daden`
      : `Your favorite category is ${t(topCategory.name)} ${topCategory.emoji} with ${topCategory.count} deeds`
  );
  
  // Categories not used
  const usedCategories = new Set(stats.map(s => s.category));
  const unusedCategories = CATEGORIES.filter(c => !usedCategories.has(c.id));
  if (unusedCategories.length > 0 && unusedCategories.length <= 3) {
    const suggestion = unusedCategories[0];
    insights.push(
      lang === 'nl'
        ? `Probeer eens ${t(suggestion.nameKey)} ${suggestion.emoji} - je hebt er nog geen daden in`
        : `Try ${t(suggestion.nameKey)} ${suggestion.emoji} - you haven't done any deeds in this category yet`
    );
  }
  
  // Trend insights
  if (comparison) {
    const growingCategory = comparison.find(c => c.trend === 'up' && c.change > 20);
    if (growingCategory) {
      insights.push(
        lang === 'nl'
          ? `Je ${t(growingCategory.name)} activiteit is ${Math.abs(growingCategory.change)}% gestegen! ${growingCategory.emoji}`
          : `Your ${t(growingCategory.name)} activity has increased by ${Math.abs(growingCategory.change)}%! ${growingCategory.emoji}`
      );
    }
  }
  
  // Most consistent category (highest percentage)
  if (stats.length > 0) {
    const mostConsistent = stats.reduce((max, stat) => 
      stat.percentage > max.percentage ? stat : max
    );
    if (mostConsistent.percentage > 30) {
      insights.push(
        lang === 'nl'
          ? `Je meest consistente categorie: ${t(mostConsistent.name)} ${mostConsistent.emoji}`
          : `Your most consistent category: ${t(mostConsistent.name)} ${mostConsistent.emoji}`
      );
    }
  }
  
  return insights;
};

// ============================================
// SIMPLE TREE ICON (No background - for modals)
// ============================================

const SimpleTreeIcon = ({ level }) => {
  const leafDark = '#166534';
  const leafMid = '#22C55E';
  const leafLight = '#4ADE80';
  const leafHighlight = '#86EFAC';
  const trunk = '#78350F';
  const trunkLight = '#A16207';
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Gradient background */}
      <defs>
        <linearGradient id="treeBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#treeBg)" rx="12" />
      
      {/* Ground */}
      <ellipse cx="50" cy="95" rx="45" ry="12" fill="#4ADE80" />
      
      {/* Level 1-2: Seed/Sprout */}
      {level <= 2 && (
        <g>
          {level === 1 && (
            <>
              <ellipse cx="50" cy="82" rx="6" ry="8" fill={trunk} />
              <ellipse cx="50" cy="80" rx="4" ry="5" fill={trunkLight} />
            </>
          )}
          {level === 2 && (
            <>
              <ellipse cx="50" cy="84" rx="5" ry="6" fill={trunk} />
              <path d="M50 78 Q49 68 50 58" stroke={leafMid} strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="45" cy="55" rx="8" ry="5" fill={leafLight} transform="rotate(-25 45 55)" />
              <ellipse cx="55" cy="55" rx="8" ry="5" fill={leafLight} transform="rotate(25 55 55)" />
            </>
          )}
        </g>
      )}
      
      {/* Level 3-4: Small plant */}
      {level >= 3 && level <= 4 && (
        <g>
          <path d={`M50 88 L50 ${55 - (level - 3) * 8}`} stroke={trunk} strokeWidth={4 + level} strokeLinecap="round" />
          <ellipse cx={40} cy={58 - (level - 3) * 5} rx={12 + level * 2} ry={8 + level} fill={leafDark} />
          <ellipse cx={60} cy={58 - (level - 3) * 5} rx={12 + level * 2} ry={8 + level} fill={leafDark} />
          <ellipse cx="50" cy={50 - (level - 3) * 6} rx={14 + level * 2} ry={10 + level} fill={leafMid} />
          <ellipse cx="50" cy={42 - (level - 3) * 6} rx={10 + level} ry={7 + level} fill={leafLight} />
        </g>
      )}
      
      {/* Level 5-7: Bush */}
      {level >= 5 && level <= 7 && (
        <g>
          <path d={`M47 88 L45 ${50 - (level - 5) * 5} Q50 ${42 - (level - 5) * 5} 55 ${50 - (level - 5) * 5} L53 88`} fill={trunk} />
          <ellipse cx={25 - (level - 5) * 3} cy={52 - (level - 5) * 4} rx={15 + (level - 5) * 2} ry={12 + (level - 5) * 2} fill={leafDark} />
          <ellipse cx={75 + (level - 5) * 3} cy={52 - (level - 5) * 4} rx={15 + (level - 5) * 2} ry={12 + (level - 5) * 2} fill={leafDark} />
          <ellipse cx={35} cy={42 - (level - 5) * 5} rx={17 + (level - 5) * 2} ry={14 + (level - 5) * 2} fill={leafMid} />
          <ellipse cx={65} cy={42 - (level - 5) * 5} rx={17 + (level - 5) * 2} ry={14 + (level - 5) * 2} fill={leafMid} />
          <ellipse cx="50" cy={35 - (level - 5) * 5} rx={20 + (level - 5) * 3} ry={16 + (level - 5) * 2} fill={leafLight} />
          <ellipse cx="50" cy={28 - (level - 5) * 4} rx={14 + (level - 5) * 2} ry={11 + (level - 5)} fill={leafHighlight} />
        </g>
      )}
      
      {/* Level 8+: Full tree */}
      {level >= 8 && (
        <g>
          {/* Trunk */}
          <path d="M43 88 L40 45 Q50 35 60 45 L57 88" fill={trunk} />
          <path d="M46 86 L44 48 Q50 40 56 48 L54 86" fill={trunkLight} />
          
          {/* Branches */}
          <path d="M42 55 Q25 45 15 52" stroke={trunk} strokeWidth="4" fill="none" />
          <path d="M58 55 Q75 45 85 52" stroke={trunk} strokeWidth="4" fill="none" />
          
          {/* Foliage */}
          {level < 12 ? (
            <>
              <ellipse cx="12" cy="48" rx={18 + Math.min(level - 8, 4)} ry={14 + Math.min(level - 8, 4)} fill={leafDark} />
              <ellipse cx="88" cy="48" rx={18 + Math.min(level - 8, 4)} ry={14 + Math.min(level - 8, 4)} fill={leafDark} />
              <ellipse cx="28" cy="38" rx={20 + Math.min(level - 8, 4)} ry={16 + Math.min(level - 8, 4)} fill={leafMid} />
              <ellipse cx="72" cy="38" rx={20 + Math.min(level - 8, 4)} ry={16 + Math.min(level - 8, 4)} fill={leafMid} />
              <ellipse cx="50" cy="30" rx={24 + Math.min(level - 8, 4)} ry={18 + Math.min(level - 8, 4)} fill={leafLight} />
              <ellipse cx="50" cy="20" rx={16 + Math.min(level - 8, 4)} ry={12 + Math.min(level - 8, 4)} fill={leafHighlight} />
            </>
          ) : level < 14 ? (
            // Golden/Autumn
            <>
              <ellipse cx="12" cy="45" rx="20" ry="16" fill="#EA580C" />
              <ellipse cx="88" cy="45" rx="20" ry="16" fill="#F97316" />
              <ellipse cx="28" cy="35" rx="22" ry="18" fill="#FB923C" />
              <ellipse cx="72" cy="35" rx="22" ry="18" fill="#FDBA74" />
              <ellipse cx="50" cy="25" rx="26" ry="20" fill="#FCD34D" />
              <ellipse cx="50" cy="15" rx="18" ry="14" fill="#FEF3C7" />
            </>
          ) : (
            // Cosmic/Purple
            <>
              <ellipse cx="12" cy="42" rx="22" ry="18" fill={level >= 16 ? '#7C3AED' : leafDark} />
              <ellipse cx="88" cy="42" rx="22" ry="18" fill={level >= 16 ? '#7C3AED' : leafDark} />
              <ellipse cx="28" cy="32" rx="24" ry="20" fill={level >= 16 ? '#8B5CF6' : leafMid} />
              <ellipse cx="72" cy="32" rx="24" ry="20" fill={level >= 16 ? '#8B5CF6' : leafMid} />
              <ellipse cx="50" cy="22" rx="28" ry="22" fill={level >= 16 ? '#A855F7' : leafLight} />
              <ellipse cx="50" cy="12" rx="20" ry="16" fill={level >= 16 ? '#C4B5FD' : leafHighlight} />
              {level >= 16 && (
                <>
                  {[[20, 35], [80, 35], [35, 22], [65, 22], [50, 10]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2" fill="white" opacity="0.9" />
                  ))}
                </>
              )}
            </>
          )}
          
          {/* Special decorations */}
          {level === 9 && (
            <>
              {[[18, 45], [82, 45], [32, 32], [68, 35], [50, 20]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#F9A8D4" />
              ))}
            </>
          )}
          {level === 10 && (
            <>
              {[[18, 45], [82, 45], [32, 32], [68, 35], [50, 20]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#DC2626" />
              ))}
            </>
          )}
        </g>
      )}
    </svg>
  );
};

// ============================================
// NATURALISTIC TREE SVG - All 16 Levels
// ============================================

const NaturalisticTree = ({ level, size = 'large' }) => {
  const isSmall = size === 'small';
  
  // Colors
  const leafDark = '#166534';
  const leafMid = '#22C55E';
  const leafLight = '#4ADE80';
  const leafHighlight = '#86EFAC';
  const trunk = '#78350F';
  const trunkLight = '#A16207';
  const pink = '#F9A8D4';
  const pinkDark = '#EC4899';
  const red = '#DC2626';
  const gold = '#FCD34D';
  const purple = '#A855F7';
  const purpleDark = '#7C3AED';
  
  // Sky colors based on phase
  const getSkyColors = () => {
    if (level >= 14) return ['#1E1B4B', '#312E81']; // Night/cosmic
    if (level >= 12) return ['#FED7AA', '#FBBF24']; // Golden sunset
    if (level === 9) return ['#FECDD3', '#FCA5A5']; // Pink bloom
    return ['#7DD3FC', '#E0F2FE']; // Day
  };
  const [skyTop, skyBottom] = getSkyColors();
  
  return (
    <svg viewBox="0 0 200 200" className={isSmall ? "w-full h-full" : "w-full h-64"}>
      <defs>
        <linearGradient id={`sky-${level}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
      </defs>
      
      {/* Sky */}
      <rect width="200" height="200" fill={`url(#sky-${level})`} />
      
      {/* Stars for cosmic levels */}
      {level >= 14 && (
        <g>
          {[[20,20],[50,35],[80,15],[120,25],[150,40],[175,18],[30,50],[160,55]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={level >= 16 ? 2 : 1.5} fill="white" opacity={0.6 + Math.random() * 0.4} />
          ))}
        </g>
      )}
      
      {/* Sun/Moon */}
      {level < 12 && (
        <circle cx="160" cy="35" r="15" fill="#FCD34D" opacity="0.9" />
      )}
      {level >= 12 && level < 14 && (
        <circle cx="160" cy="35" r="12" fill="#FEF3C7" />
      )}
      
      {/* Ground */}
      <ellipse cx="100" cy="200" rx="120" ry="35" fill="#86EFAC" />
      <ellipse cx="100" cy="190" rx="100" ry="25" fill="#4ADE80" />
      
      {/* === LEVEL 1: Seed === */}
      {level === 1 && (
        <g>
          <ellipse cx="100" cy="168" rx="8" ry="10" fill={trunk} />
          <ellipse cx="100" cy="166" rx="5" ry="7" fill={trunkLight} />
          <ellipse cx="98" cy="164" rx="2" ry="3" fill="#D4A574" opacity="0.5" />
        </g>
      )}
      
      {/* === LEVEL 2: Germinating === */}
      {level === 2 && (
        <g>
          <ellipse cx="100" cy="168" rx="6" ry="8" fill={trunk} />
          <path d="M100 160 Q99 150 100 140" stroke={leafMid} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="95" cy="138" rx="7" ry="5" fill={leafLight} transform="rotate(-25 95 138)" />
          <ellipse cx="105" cy="138" rx="7" ry="5" fill={leafLight} transform="rotate(25 105 138)" />
        </g>
      )}
      
      {/* === LEVEL 3: First Sprout === */}
      {level === 3 && (
        <g>
          <path d="M100 175 L100 130" stroke={leafMid} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="90" cy="145" rx="12" ry="7" fill={leafLight} transform="rotate(-20 90 145)" />
          <ellipse cx="110" cy="145" rx="12" ry="7" fill={leafLight} transform="rotate(20 110 145)" />
          <ellipse cx="92" cy="130" rx="10" ry="6" fill={leafMid} transform="rotate(-30 92 130)" />
          <ellipse cx="108" cy="130" rx="10" ry="6" fill={leafMid} transform="rotate(30 108 130)" />
          <ellipse cx="100" cy="120" rx="6" ry="8" fill={leafHighlight} />
        </g>
      )}
      
      {/* === LEVEL 4: Seedling === */}
      {level === 4 && (
        <g>
          <path d="M100 175 L100 115" stroke={trunk} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="85" cy="150" rx="15" ry="9" fill={leafDark} transform="rotate(-15 85 150)" />
          <ellipse cx="115" cy="150" rx="15" ry="9" fill={leafDark} transform="rotate(15 115 150)" />
          <ellipse cx="88" cy="132" rx="14" ry="8" fill={leafMid} transform="rotate(-25 88 132)" />
          <ellipse cx="112" cy="132" rx="14" ry="8" fill={leafMid} transform="rotate(25 112 132)" />
          <ellipse cx="92" cy="118" rx="12" ry="7" fill={leafLight} transform="rotate(-20 92 118)" />
          <ellipse cx="108" cy="118" rx="12" ry="7" fill={leafLight} transform="rotate(20 108 118)" />
          <ellipse cx="100" cy="108" rx="8" ry="10" fill={leafHighlight} />
        </g>
      )}
      
      {/* === LEVEL 5: Young Plant === */}
      {level === 5 && (
        <g>
          <path d="M100 175 L100 105" stroke={trunk} strokeWidth="6" strokeLinecap="round" />
          <path d="M100 140 Q80 130 70 140" stroke={trunk} strokeWidth="3" fill="none" />
          <path d="M100 140 Q120 130 130 140" stroke={trunk} strokeWidth="3" fill="none" />
          
          <ellipse cx="65" cy="135" rx="18" ry="14" fill={leafDark} />
          <ellipse cx="135" cy="135" rx="18" ry="14" fill={leafDark} />
          <ellipse cx="80" cy="120" rx="20" ry="15" fill={leafMid} />
          <ellipse cx="120" cy="120" rx="20" ry="15" fill={leafMid} />
          <ellipse cx="100" cy="105" rx="22" ry="16" fill={leafLight} />
          <ellipse cx="100" cy="95" rx="15" ry="12" fill={leafHighlight} />
        </g>
      )}
      
      {/* === LEVEL 6: Small Bush === */}
      {level === 6 && (
        <g>
          <path d="M95 175 L93 100 Q100 90 107 100 L105 175" fill={trunk} />
          <path d="M95 130 Q65 115 50 125" stroke={trunk} strokeWidth="4" fill="none" />
          <path d="M105 130 Q135 115 150 125" stroke={trunk} strokeWidth="4" fill="none" />
          
          <ellipse cx="45" cy="120" rx="22" ry="18" fill={leafDark} />
          <ellipse cx="155" cy="120" rx="22" ry="18" fill={leafDark} />
          <ellipse cx="70" cy="100" rx="25" ry="20" fill={leafMid} />
          <ellipse cx="130" cy="100" rx="25" ry="20" fill={leafMid} />
          <ellipse cx="100" cy="90" rx="28" ry="22" fill={leafLight} />
          <ellipse cx="100" cy="78" rx="20" ry="16" fill={leafHighlight} />
        </g>
      )}
      
      {/* === LEVEL 7: Large Bush === */}
      {level === 7 && (
        <g>
          <path d="M92 175 L88 95 Q100 82 112 95 L108 175" fill={trunk} />
          <path d="M92 120 Q55 100 35 115" stroke={trunk} strokeWidth="5" fill="none" />
          <path d="M108 120 Q145 100 165 115" stroke={trunk} strokeWidth="5" fill="none" />
          
          <ellipse cx="30" cy="108" rx="28" ry="22" fill={leafDark} />
          <ellipse cx="170" cy="108" rx="28" ry="22" fill={leafDark} />
          <ellipse cx="55" cy="85" rx="30" ry="24" fill={leafMid} />
          <ellipse cx="145" cy="85" rx="30" ry="24" fill={leafMid} />
          <ellipse cx="100" cy="75" rx="35" ry="28" fill={leafLight} />
          <ellipse cx="100" cy="60" rx="25" ry="20" fill={leafHighlight} />
          
          {/* Bird */}
          <g transform="translate(145, 70)">
            <ellipse rx="6" ry="4" fill="#78350F" />
            <circle cx="-4" cy="-2" r="4" fill="#92400E" />
            <circle cx="-5" cy="-3" r="1" fill="#1F2937" />
            <path d="M-8 -2 L-11 -1" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      )}
      
      {/* === LEVEL 8: Young Tree === */}
      {level === 8 && (
        <g>
          <path d="M92 175 Q85 170 75 172" stroke={trunk} strokeWidth="5" fill="none" />
          <path d="M108 175 Q115 170 125 172" stroke={trunk} strokeWidth="5" fill="none" />
          <path d="M90 175 L85 85 Q100 70 115 85 L110 175" fill={trunk} />
          
          <path d="M88 105 Q50 85 25 100" stroke={trunk} strokeWidth="6" fill="none" />
          <path d="M112 105 Q150 85 175 100" stroke={trunk} strokeWidth="6" fill="none" />
          <path d="M90 85 Q65 65 50 75" stroke={trunk} strokeWidth="4" fill="none" />
          <path d="M110 85 Q135 65 150 75" stroke={trunk} strokeWidth="4" fill="none" />
          
          <ellipse cx="20" cy="92" rx="30" ry="25" fill={leafDark} />
          <ellipse cx="180" cy="92" rx="30" ry="25" fill={leafDark} />
          <ellipse cx="45" cy="70" rx="32" ry="26" fill={leafMid} />
          <ellipse cx="155" cy="70" rx="32" ry="26" fill={leafMid} />
          <ellipse cx="75" cy="55" rx="35" ry="28" fill={leafMid} />
          <ellipse cx="125" cy="55" rx="35" ry="28" fill={leafMid} />
          <ellipse cx="100" cy="45" rx="40" ry="32" fill={leafLight} />
          <ellipse cx="100" cy="32" rx="28" ry="22" fill={leafHighlight} />
        </g>
      )}
      
      {/* === LEVEL 9: Blooming Tree === */}
      {level === 9 && (
        <g>
          <path d="M92 175 Q82 172 70 175" stroke={trunk} strokeWidth="6" fill="none" />
          <path d="M108 175 Q118 172 130 175" stroke={trunk} strokeWidth="6" fill="none" />
          <path d="M88 175 L82 80 Q100 62 118 80 L112 175" fill={trunk} />
          
          <path d="M86 100 Q45 78 20 95" stroke={trunk} strokeWidth="7" fill="none" />
          <path d="M114 100 Q155 78 180 95" stroke={trunk} strokeWidth="7" fill="none" />
          
          <ellipse cx="15" cy="88" rx="32" ry="26" fill={leafMid} />
          <ellipse cx="185" cy="88" rx="32" ry="26" fill={leafMid} />
          <ellipse cx="45" cy="65" rx="35" ry="28" fill={leafLight} />
          <ellipse cx="155" cy="65" rx="35" ry="28" fill={leafLight} />
          <ellipse cx="100" cy="50" rx="45" ry="36" fill={leafLight} />
          <ellipse cx="100" cy="35" rx="32" ry="25" fill={leafHighlight} />
          
          {/* Cherry blossoms */}
          {[[25,80],[175,82],[50,58],[150,60],[80,40],[120,42],[100,25],[70,70],[130,68]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={pink} />
              <circle cx={x} cy={y} r="2" fill={pinkDark} opacity="0.6" />
            </g>
          ))}
          
          {/* Butterfly */}
          <g transform="translate(140, 45)">
            <ellipse rx="2" ry="4" fill="#1F2937" />
            <ellipse cx="-5" cy="-1" rx="6" ry="4" fill="#F97316" />
            <ellipse cx="5" cy="-1" rx="6" ry="4" fill="#F97316" />
          </g>
          
          {/* Falling petals */}
          {[[35,120],[165,125],[100,140]].map(([x,y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="3" ry="2" fill={pink} opacity="0.7" transform={`rotate(${i*30} ${x} ${y})`} />
          ))}
        </g>
      )}
      
      {/* === LEVEL 10: Fruit Tree === */}
      {level === 10 && (
        <g>
          <path d="M90 175 Q78 172 62 178" stroke={trunk} strokeWidth="7" fill="none" />
          <path d="M110 175 Q122 172 138 178" stroke={trunk} strokeWidth="7" fill="none" />
          <path d="M86 175 L78 75 Q100 55 122 75 L114 175" fill={trunk} />
          
          <path d="M82 95 Q40 70 12 90" stroke={trunk} strokeWidth="8" fill="none" />
          <path d="M118 95 Q160 70 188 90" stroke={trunk} strokeWidth="8" fill="none" />
          <path d="M85 75 Q55 50 35 62" stroke={trunk} strokeWidth="5" fill="none" />
          <path d="M115 75 Q145 50 165 62" stroke={trunk} strokeWidth="5" fill="none" />
          
          <ellipse cx="8" cy="82" rx="35" ry="28" fill={leafDark} />
          <ellipse cx="192" cy="82" rx="35" ry="28" fill={leafDark} />
          <ellipse cx="35" cy="55" rx="38" ry="30" fill={leafMid} />
          <ellipse cx="165" cy="55" rx="38" ry="30" fill={leafMid} />
          <ellipse cx="70" cy="40" rx="40" ry="32" fill={leafLight} />
          <ellipse cx="130" cy="40" rx="40" ry="32" fill={leafLight} />
          <ellipse cx="100" cy="30" rx="45" ry="35" fill={leafLight} />
          <ellipse cx="100" cy="18" rx="30" ry="24" fill={leafHighlight} />
          
          {/* Apples */}
          {[[20,75],[180,78],[42,48],[158,50],[75,32],[125,34],[100,15]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill={red} />
              <circle cx={x-1.5} cy={y-1.5} r="2" fill="#FCA5A5" opacity="0.6" />
              <path d={`M${x} ${y-6} Q${x+2} ${y-9} ${x+4} ${y-7}`} stroke="#166534" strokeWidth="1.5" fill="none" />
            </g>
          ))}
        </g>
      )}
      
      {/* === LEVEL 11: Shade Tree === */}
      {level === 11 && (
        <g>
          {/* Shadow on ground */}
          <ellipse cx="100" cy="185" rx="80" ry="15" fill={leafDark} opacity="0.2" />
          
          <path d="M88 175 Q72 172 55 180" stroke={trunk} strokeWidth="8" fill="none" />
          <path d="M112 175 Q128 172 145 180" stroke={trunk} strokeWidth="8" fill="none" />
          <path d="M84 175 L74 70 Q100 48 126 70 L116 175" fill={trunk} />
          
          <path d="M80 92 Q35 65 5 85" stroke={trunk} strokeWidth="9" fill="none" />
          <path d="M120 92 Q165 65 195 85" stroke={trunk} strokeWidth="9" fill="none" />
          <path d="M82 70 Q50 42 28 55" stroke={trunk} strokeWidth="6" fill="none" />
          <path d="M118 70 Q150 42 172 55" stroke={trunk} strokeWidth="6" fill="none" />
          
          <ellipse cx="0" cy="78" rx="38" ry="30" fill={leafDark} />
          <ellipse cx="200" cy="78" rx="38" ry="30" fill={leafDark} />
          <ellipse cx="28" cy="48" rx="40" ry="32" fill={leafMid} />
          <ellipse cx="172" cy="48" rx="40" ry="32" fill={leafMid} />
          <ellipse cx="60" cy="32" rx="42" ry="34" fill={leafMid} />
          <ellipse cx="140" cy="32" rx="42" ry="34" fill={leafMid} />
          <ellipse cx="100" cy="25" rx="50" ry="38" fill={leafLight} />
          <ellipse cx="100" cy="12" rx="35" ry="28" fill={leafHighlight} />
          
          {/* Person resting */}
          <g transform="translate(135, 168)">
            <ellipse cx="0" cy="5" rx="10" ry="3" fill="#1F2937" opacity="0.2" />
            <circle cx="0" cy="-8" r="5" fill="#FED7AA" />
            <ellipse cx="0" cy="0" rx="6" ry="8" fill="#3B82F6" />
          </g>
        </g>
      )}
      
      {/* === LEVEL 12: Ancient Tree === */}
      {level === 12 && (
        <g>
          <path d="M85 175 Q65 172 45 182" stroke={trunk} strokeWidth="10" fill="none" />
          <path d="M115 175 Q135 172 155 182" stroke={trunk} strokeWidth="10" fill="none" />
          <path d="M80 175 L68 65 Q100 40 132 65 L120 175" fill={trunk} />
          <path d="M86 172 L76 70 Q100 48 124 70 L114 172" fill={trunkLight} />
          
          {/* Hollow */}
          <ellipse cx="100" cy="130" rx="8" ry="12" fill="#1F2937" />
          
          <path d="M75 85 Q28 55 -5 75" stroke={trunk} strokeWidth="10" fill="none" />
          <path d="M125 85 Q172 55 205 75" stroke={trunk} strokeWidth="10" fill="none" />
          
          {/* Autumn foliage */}
          <ellipse cx="-8" cy="68" rx="40" ry="32" fill="#EA580C" />
          <ellipse cx="208" cy="68" rx="40" ry="32" fill="#F97316" />
          <ellipse cx="25" cy="42" rx="42" ry="34" fill="#F97316" />
          <ellipse cx="175" cy="42" rx="42" ry="34" fill="#FB923C" />
          <ellipse cx="58" cy="25" rx="45" ry="36" fill="#FB923C" />
          <ellipse cx="142" cy="25" rx="45" ry="36" fill="#FDBA74" />
          <ellipse cx="100" cy="18" rx="52" ry="40" fill="#FDBA74" />
          <ellipse cx="100" cy="5" rx="38" ry="30" fill="#FED7AA" />
          
          {/* Owl in hollow */}
          <g transform="translate(100, 128)">
            <ellipse rx="6" ry="8" fill="#78350F" />
            <circle cx="-3" cy="-4" r="3" fill="#FEF3C7" />
            <circle cx="3" cy="-4" r="3" fill="#FEF3C7" />
            <circle cx="-3" cy="-4" r="1.5" fill="#1F2937" />
            <circle cx="3" cy="-4" r="1.5" fill="#1F2937" />
            <path d="M-1.5 1 L0 3 L1.5 1" fill="#F97316" />
          </g>
        </g>
      )}
      
      {/* === LEVEL 13: Sacred Tree === */}
      {level === 13 && (
        <g>
          <path d="M82 175 Q60 172 38 185" stroke={trunk} strokeWidth="11" fill="none" />
          <path d="M118 175 Q140 172 162 185" stroke={trunk} strokeWidth="11" fill="none" />
          <path d="M78 175 L65 60 Q100 32 135 60 L122 175" fill={trunk} />
          <path d="M85 172 L74 65 Q100 40 126 65 L115 172" fill={trunkLight} />
          
          <ellipse cx="100" cy="130" rx="8" ry="12" fill="#1F2937" />
          
          <path d="M72 80 Q22 48 -10 70" stroke={trunk} strokeWidth="11" fill="none" />
          <path d="M128 80 Q178 48 210 70" stroke={trunk} strokeWidth="11" fill="none" />
          
          <ellipse cx="-12" cy="62" rx="42" ry="34" fill={leafDark} />
          <ellipse cx="212" cy="62" rx="42" ry="34" fill={leafDark} />
          <ellipse cx="22" cy="38" rx="44" ry="36" fill={leafMid} />
          <ellipse cx="178" cy="38" rx="44" ry="36" fill={leafMid} />
          <ellipse cx="55" cy="22" rx="48" ry="38" fill={leafLight} />
          <ellipse cx="145" cy="22" rx="48" ry="38" fill={leafLight} />
          <ellipse cx="100" cy="15" rx="55" ry="42" fill={leafLight} />
          <ellipse cx="100" cy="2" rx="40" ry="32" fill={leafHighlight} />
          
          {/* Silver shimmer */}
          <ellipse cx="100" cy="18" rx="45" ry="30" fill="white" opacity="0.15" />
          
          {/* Magical sparkles */}
          {[[30,50],[170,48],[55,25],[145,27],[100,8],[80,40],[120,38]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill={gold} />
              <circle cx={x} cy={y} r="6" fill={gold} opacity="0.3" />
            </g>
          ))}
          
          {/* Owl */}
          <g transform="translate(100, 128)">
            <ellipse rx="6" ry="8" fill="#78350F" />
            <circle cx="-3" cy="-4" r="3" fill="#FEF3C7" />
            <circle cx="3" cy="-4" r="3" fill="#FEF3C7" />
            <circle cx="-3" cy="-4" r="1.5" fill="#1F2937" />
            <circle cx="3" cy="-4" r="1.5" fill="#1F2937" />
          </g>
        </g>
      )}
      
      {/* === LEVEL 14: Tree of Life === */}
      {level === 14 && (
        <g>
          <path d="M80 175 Q55 172 30 188" stroke={trunk} strokeWidth="12" fill="none" />
          <path d="M120 175 Q145 172 170 188" stroke={trunk} strokeWidth="12" fill="none" />
          <path d="M75 175 L60 55 Q100 25 140 55 L125 175" fill={trunk} />
          <path d="M82 172 L70 60 Q100 32 130 60 L118 172" fill={trunkLight} />
          
          {/* Golden patterns on trunk */}
          <path d="M85 100 Q100 90 115 100" stroke={gold} strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M88 120 Q100 112 112 120" stroke={gold} strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M90 140 Q100 134 110 140" stroke={gold} strokeWidth="2" fill="none" opacity="0.6" />
          
          <path d="M68 75 Q18 42 -15 65" stroke={trunk} strokeWidth="12" fill="none" />
          <path d="M132 75 Q182 42 215 65" stroke={trunk} strokeWidth="12" fill="none" />
          
          <ellipse cx="-18" cy="58" rx="45" ry="36" fill={leafDark} />
          <ellipse cx="218" cy="58" rx="45" ry="36" fill={leafDark} />
          <ellipse cx="18" cy="32" rx="48" ry="38" fill={leafMid} />
          <ellipse cx="182" cy="32" rx="48" ry="38" fill={leafMid} />
          <ellipse cx="52" cy="18" rx="50" ry="40" fill={leafLight} />
          <ellipse cx="148" cy="18" rx="50" ry="40" fill={leafLight} />
          <ellipse cx="100" cy="10" rx="58" ry="45" fill={leafLight} />
          <ellipse cx="100" cy="-2" rx="42" ry="34" fill={leafHighlight} />
          
          {/* Golden glow */}
          <ellipse cx="100" cy="15" rx="65" ry="45" fill={gold} opacity="0.15" />
          
          {/* Golden orbs */}
          {[[25,48],[175,50],[55,22],[145,24],[100,5]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill={gold} />
              <circle cx={x-2} cy={y-2} r="3" fill="#FEF3C7" opacity="0.7" />
            </g>
          ))}
          
          {/* Light rays */}
          <g opacity="0.3">
            {[0, 30, 60, 90, 120, 150].map((angle, i) => (
              <line key={i} x1="100" y1="5" x2={100 + Math.cos(angle * Math.PI / 180) * 60} y2={5 + Math.sin(angle * Math.PI / 180) * 40} stroke={gold} strokeWidth="2" />
            ))}
          </g>
        </g>
      )}
      
      {/* === LEVEL 15: World Tree === */}
      {level === 15 && (
        <g>
          <path d="M78 175 Q50 172 22 190" stroke={trunk} strokeWidth="13" fill="none" />
          <path d="M122 175 Q150 172 178 190" stroke={trunk} strokeWidth="13" fill="none" />
          <path d="M72 175 L55 50 Q100 18 145 50 L128 175" fill={trunk} />
          <path d="M80 172 L66 55 Q100 25 134 55 L120 172" fill={trunkLight} />
          
          <path d="M65 70 Q12 35 -20 60" stroke={trunk} strokeWidth="13" fill="none" />
          <path d="M135 70 Q188 35 220 60" stroke={trunk} strokeWidth="13" fill="none" />
          
          <ellipse cx="-22" cy="52" rx="48" ry="38" fill={leafDark} />
          <ellipse cx="222" cy="52" rx="48" ry="38" fill={leafDark} />
          <ellipse cx="15" cy="28" rx="50" ry="40" fill={leafMid} />
          <ellipse cx="185" cy="28" rx="50" ry="40" fill={leafMid} />
          <ellipse cx="50" cy="12" rx="52" ry="42" fill={leafLight} />
          <ellipse cx="150" cy="12" rx="52" ry="42" fill={leafLight} />
          <ellipse cx="100" cy="5" rx="60" ry="48" fill={leafLight} />
          <ellipse cx="100" cy="-8" rx="45" ry="36" fill={leafHighlight} />
          
          {/* Floating islands */}
          {[[35,40],[165,42]].map(([x,y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y+8} rx="12" ry="4" fill={trunk} opacity="0.4" />
              <ellipse cx={x} cy={y} rx="10" ry="7" fill="#86EFAC" />
              <ellipse cx={x} cy={y-3} rx="6" ry="4" fill={leafLight} />
            </g>
          ))}
          
          {/* Globe at top */}
          <circle cx="100" cy="-5" r="12" fill="#3B82F6" />
          <ellipse cx="97" cy="-7" rx="4" ry="7" fill={leafMid} opacity="0.7" />
          <circle cx="95" cy="-10" r="3" fill="white" opacity="0.4" />
        </g>
      )}
      
      {/* === LEVEL 16: Cosmic Tree === */}
      {level === 16 && (
        <g>
          <path d="M75 175 Q45 172 15 192" stroke={purpleDark} strokeWidth="14" fill="none" />
          <path d="M125 175 Q155 172 185 192" stroke={purpleDark} strokeWidth="14" fill="none" />
          <path d="M70 175 L52 45 Q100 12 148 45 L130 175" fill={purpleDark} />
          <path d="M78 172 L62 50 Q100 20 138 50 L122 172" fill={purple} />
          
          {/* Mystical patterns */}
          <path d="M82 95 Q100 85 118 95" stroke="#C4B5FD" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M85 115 Q100 107 115 115" stroke="#C4B5FD" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M88 135 Q100 129 112 135" stroke="#C4B5FD" strokeWidth="2" fill="none" opacity="0.6" />
          
          <path d="M62 65 Q8 30 -25 55" stroke={purpleDark} strokeWidth="14" fill="none" />
          <path d="M138 65 Q192 30 225 55" stroke={purpleDark} strokeWidth="14" fill="none" />
          
          <ellipse cx="-28" cy="48" rx="50" ry="40" fill="#581C87" />
          <ellipse cx="228" cy="48" rx="50" ry="40" fill="#581C87" />
          <ellipse cx="12" cy="25" rx="52" ry="42" fill="#7C3AED" />
          <ellipse cx="188" cy="25" rx="52" ry="42" fill="#7C3AED" />
          <ellipse cx="48" cy="8" rx="55" ry="44" fill={purple} />
          <ellipse cx="152" cy="8" rx="55" ry="44" fill={purple} />
          <ellipse cx="100" cy="0" rx="62" ry="50" fill="#A855F7" />
          <ellipse cx="100" cy="-12" rx="48" ry="38" fill="#C4B5FD" />
          
          {/* Cosmic eye */}
          <circle cx="100" cy="-8" r="15" fill="#1E1B4B" opacity="0.8" />
          <circle cx="100" cy="-8" r="10" fill={purple} />
          <circle cx="100" cy="-8" r="4" fill="white" />
          
          {/* Extra stars */}
          {[[40,60],[160,58],[70,35],[130,38],[100,18]].map(([x,y], i) => (
            <circle key={`s${i}`} cx={x} cy={y} r="2.5" fill="white" opacity="0.8" />
          ))}
          
          {/* Nebula effect */}
          <ellipse cx="60" cy="30" rx="20" ry="10" fill="#EC4899" opacity="0.2" />
          <ellipse cx="140" cy="25" rx="18" ry="8" fill="#8B5CF6" opacity="0.2" />
        </g>
      )}
      
      {/* Level badge */}
      {!isSmall && (
        <g>
          <circle cx="180" cy="175" r="15" fill="white" opacity="0.9" />
          <text x="180" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Lv.{level}</text>
        </g>
      )}
    </svg>
  );
};

// ============================================
// ONBOARDING SCREEN
// ============================================

const OnboardingScreen = ({ onComplete, initialLang, onLangChange }) => {
  const [lang, setLang] = useState(initialLang || 'en');
  const t = (key) => translations[lang][key] || translations['en'][key] || key;
  const [step, setStep] = useState(0);
  
  const handleLangChange = (newLang) => {
    setLang(newLang);
    onLangChange(newLang);
  };
  
  const steps = [
    { title: t('onboardingStep1Title'), desc: t('onboardingStep1Desc'), emoji: '💚', level: 1 },
    { title: t('onboardingStep2Title'), desc: t('onboardingStep2Desc'), emoji: '⭐', level: 5 },
    { title: t('onboardingStep3Title'), desc: t('onboardingStep3Desc'), emoji: '🌳', level: 10 },
    { title: t('onboardingStep4Title'), desc: t('onboardingStep4Desc'), emoji: '🔥', level: 16 },
  ];
  
  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 z-50 flex flex-col">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-40 right-0 w-48 h-48 bg-yellow-300/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-40 h-40 bg-pink-300/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-white/10 rounded-full blur-2xl" />
      </div>
      
      <div className="relative flex justify-between items-center p-3 sm:p-4">
        {/* Language selector */}
        <div className="flex gap-1.5">
          <button 
            onClick={() => handleLangChange('en')} 
            className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all ${lang === 'en' ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'}`}
          >
            🇬🇧 EN
          </button>
          <button 
            onClick={() => handleLangChange('nl')} 
            className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all ${lang === 'nl' ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'}`}
          >
            🇳🇱 NL
          </button>
        </div>
        <button onClick={onComplete} className="text-white/70 text-xs sm:text-sm font-medium">{t('skip')}</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8">
        {step === 0 && (
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{t('onboardingWelcome')}</h1>
            <p className="text-white/80 text-sm sm:text-base">{t('onboardingSubtitle')}</p>
          </div>
        )}
        <div className="w-36 h-36 sm:w-48 sm:h-48 mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <SimpleTreeIcon level={currentStep.level} />
        </div>
        <div className="text-center">
          <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block">{currentStep.emoji}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{currentStep.title}</h2>
          <p className="text-white/80 max-w-xs text-sm sm:text-base">{currentStep.desc}</p>
        </div>
      </div>
      <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 sm:h-2 rounded-full transition-all ${i === step ? 'w-5 sm:w-6 bg-white' : 'w-1.5 sm:w-2 bg-white/40'}`} />
        ))}
      </div>
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 max-w-md mx-auto w-full">
        <button onClick={() => isLastStep ? onComplete() : setStep(s => s + 1)} className="w-full py-3 sm:py-4 bg-white rounded-2xl font-bold text-emerald-600 shadow-lg active:scale-95 transition-transform text-sm sm:text-base">
          {isLastStep ? t('getStarted') : t('next')}
        </button>
      </div>
    </div>
  );
};

// ============================================
// LEVEL UP MODAL
// ============================================

const LevelUpModal = ({ stage, onClose }) => {
  const t = useTranslation();
  const phase = PHASES[stage.phase];
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full text-center" style={{ animation: 'bounceIn 0.4s ease-out' }}>
        <div className="text-3xl sm:text-4xl mb-2">🎉</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{t('levelUp')}</h2>
        <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">{t('congratulations')}</p>
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-4 rounded-2xl overflow-hidden shadow-lg">
          <SimpleTreeIcon level={stage.level} />
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-gray-500">{t('newLevel')}</span>
          <p className="text-lg sm:text-xl font-bold text-gray-800">{t(stage.nameKey)}</p>
          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block" style={{ backgroundColor: phase.color + '40', color: phase.color }}>
            {phase.icon} {t(phase.nameKey)} • Level {stage.level}
          </span>
        </div>
        <button onClick={onClose} className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl font-bold text-white text-sm sm:text-base">
          {t('continue')}
        </button>
      </div>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// WEEKLY/MONTHLY STATISTICS
// ============================================

const WeeklyMonthlyStats = ({ deeds, onClick }) => {
  const t = useTranslation();
  
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Monday
  startOfWeek.setHours(0, 0, 0, 0);
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const weekDeeds = deeds.filter(d => new Date(d.date) >= startOfWeek);
  const monthDeeds = deeds.filter(d => new Date(d.date) >= startOfMonth);
  
  const weekPoints = weekDeeds.reduce((sum, d) => sum + d.points, 0);
  const monthPoints = monthDeeds.reduce((sum, d) => sum + d.points, 0);
  
  // Calculate days with deeds this week
  const weekDays = [...new Set(weekDeeds.map(d => d.date))].length;
  const monthDays = [...new Set(monthDeeds.map(d => d.date))].length;
  
  // Week progress (7 days goal)
  const weekProgress = Math.min((weekDays / 7) * 100, 100);
  
  return (
    <button onClick={onClick} className="w-full bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow active:scale-[0.99]">
      <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5">📊 {t('statistics')}</span>
        <span className="text-gray-400 text-[10px] sm:text-xs font-normal">→ {t('allDeeds')}</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* This Week */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-2 sm:p-2.5 border border-blue-100">
          <p className="text-[10px] sm:text-xs text-blue-600 font-medium mb-1">{t('thisWeek')}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-blue-700">{weekDeeds.length}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">{t('deeds')}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm sm:text-base font-semibold text-cyan-600">+{weekPoints}</span>
            <span className="text-[10px] sm:text-xs text-gray-400">{t('points')}</span>
          </div>
          {/* Week progress bar */}
          <div className="mt-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-500 mb-0.5">
              <span>{weekDays}/7 {t('weekdays')[0].toLowerCase() === 'm' ? 'dagen' : 'days'}</span>
              <span>{Math.round(weekProgress)}%</span>
            </div>
            <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${weekProgress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* This Month */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-2 sm:p-2.5 border border-rose-100">
          <p className="text-[10px] sm:text-xs text-rose-600 font-medium mb-1">{t('thisMonth')}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-rose-700">{monthDeeds.length}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">{t('deeds')}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm sm:text-base font-semibold text-pink-600">+{monthPoints}</span>
            <span className="text-[10px] sm:text-xs text-gray-400">{t('points')}</span>
          </div>
          {/* Month active days */}
          <div className="mt-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-500 mb-0.5">
              <span>{monthDays} {t('weekdays')[0].toLowerCase() === 'm' ? 'actieve dagen' : 'active days'}</span>
              <span>📅</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(Math.min(monthDays, 10))].map((_, i) => (
                <div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-rose-400 to-pink-400" />
              ))}
              {monthDays > 10 && (
                <span className="text-[9px] text-rose-500 ml-0.5">+{monthDays - 10}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

// ============================================
// ALL DEEDS SCREEN
// ============================================

const AllDeedsScreen = ({ deeds, onClose }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const totalPoints = deeds.reduce((sum, d) => sum + d.points, 0);
  
  // Filter deeds
  const filteredDeeds = filter === 'all' 
    ? deeds 
    : deeds.filter(d => d.category === filter);
  
  // Sort deeds
  const sortedDeeds = [...filteredDeeds].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === 'newest') {
      return dateB - dateA || b.id - a.id;
    }
    return dateA - dateB || a.id - b.id;
  });
  
  // Group by date
  const groupedDeeds = sortedDeeds.reduce((groups, deed) => {
    const date = deed.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(deed);
    return groups;
  }, {});
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return lang === 'nl' ? 'Vandaag' : 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return lang === 'nl' ? 'Gisteren' : 'Yesterday';
    }
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 z-50 overflow-y-auto">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/40 to-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-pink-200/30 to-orange-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-md mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100"
          >
            <span className="text-gray-600">←</span>
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">📋 {t('allDeeds')}</h1>
          <div className="w-9 h-9 sm:w-10 sm:h-10" /> {/* Spacer */}
        </div>
        
        {/* Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 mb-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100 text-xs sm:text-sm">{t('totalDeeds')}</p>
              <p className="text-2xl sm:text-3xl font-bold">{deeds.length}</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-xs sm:text-sm">{t('totalEarned')}</p>
              <p className="text-2xl sm:text-3xl font-bold">+{totalPoints}</p>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'all' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {t('filterAll')} ({deeds.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = deeds.filter(d => d.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                    filter === cat.id 
                      ? 'text-white' 
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                  style={filter === cat.id ? { backgroundColor: cat.color } : {}}
                >
                  <span>{cat.emoji}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          
          {/* Sort toggle */}
          <button
            onClick={() => setSortOrder(s => s === 'newest' ? 'oldest' : 'newest')}
            className="text-xs text-gray-500 mt-2 flex items-center gap-1"
          >
            <span>↕️</span>
            <span>{sortOrder === 'newest' ? t('sortNewest') : t('sortOldest')}</span>
          </button>
        </div>
        
        {/* Deeds list */}
        {deeds.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <span className="text-4xl mb-3 block">🌱</span>
            <p className="text-gray-600 font-medium">{t('noDeedsYet')}</p>
            <p className="text-gray-400 text-sm mt-1">{t('startJourney')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedDeeds).map(([date, dateDeeds]) => (
              <div key={date}>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 px-1">
                  {formatDate(date)} · {dateDeeds.reduce((sum, d) => sum + d.points, 0)} {t('points')}
                </h3>
                <div className="space-y-2">
                  {dateDeeds.map(deed => {
                    const cat = CATEGORIES.find(c => c.id === deed.category);
                    return (
                      <div 
                        key={deed.id} 
                        className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm"
                      >
                        <div 
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" 
                          style={{ backgroundColor: cat?.color + '20' }}
                        >
                          {cat?.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 font-medium text-sm truncate">{deed.action}</p>
                          <p className="text-gray-400 text-xs">{t(cat?.nameKey)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span 
                            className="text-xs font-bold px-2 py-1 rounded-lg text-white" 
                            style={{ backgroundColor: cat?.color }}
                          >
                            +{deed.points}
                          </span>
                          {deed.mood && <span className="text-sm">{deed.mood}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// STREAK DISPLAY
// ============================================

const StreakDisplay = ({ streak }) => {
  const t = useTranslation();
  if (streak.current === 0 && streak.record === 0) return null;
  
  return (
    <div className={`rounded-xl p-2.5 sm:p-3 border ${streak.current > 0 ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xl sm:text-2xl">{streak.current > 0 ? '🔥' : '💨'}</span>
          <div>
            <p className={`text-lg sm:text-xl font-bold ${streak.current > 0 ? 'text-orange-600' : 'text-gray-400'}`}>{streak.current}</p>
            <p className="text-[10px] sm:text-xs text-gray-500">{t('dayStreak')}</p>
          </div>
        </div>
        {streak.record > 0 && (
          <div className="text-right">
            <p className="text-xs sm:text-sm font-bold text-gray-600">🏆 {streak.record}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">{t('streakRecord')}</p>
          </div>
        )}
      </div>
      {streak.current >= 3 && <p className="text-[10px] sm:text-xs text-orange-600 mt-1.5 sm:mt-2 text-center font-medium">{t('keepGoing')}</p>}
      {streak.streakBroken && <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 sm:mt-2 text-center">{t('streakLost')}</p>}
    </div>
  );
};

// ============================================
// UI COMPONENTS
// ============================================

const BottomNav = ({ activeTab, setActiveTab }) => {
  const t = useTranslation();
  const tabs = [
    { id: 'home', label: t('home'), icon: '🏠' },
    { id: 'tree', label: t('tree'), icon: '🌳' },
    { id: 'calendar', label: t('calendar'), icon: '📅' },
    { id: 'goals', label: t('goals'), icon: '🎯' },
    { id: 'profile', label: t('profile'), icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 z-40 safe-area-pb">
      <div className="flex justify-around h-14 sm:h-16 max-w-md mx-auto px-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
              activeTab === tab.id ? 'bg-emerald-50 scale-105' : 'text-gray-400'
            }`}
          >
            <span className="text-base sm:text-lg">{tab.icon}</span>
            <span className={`text-[10px] sm:text-xs font-medium truncate ${activeTab === tab.id ? 'text-emerald-700' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const FAB = ({ onClick }) => (
  <button onClick={onClick} className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-light hover:scale-110 active:scale-95 transition-all z-50">
    +
  </button>
);

const LanguageToggle = ({ lang, setLang }) => (
  <button onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')} className="flex items-center gap-1 px-2 py-1 bg-white rounded-lg shadow-sm border border-gray-100 text-sm">
    <span>{lang === 'nl' ? '🇳🇱' : '🇬🇧'}</span>
    <span className="font-medium text-gray-600">{lang.toUpperCase()}</span>
  </button>
);

// ============================================
// SCREENS
// ============================================

const HomeScreen = ({ deeds, totalPoints, stage, nextStage, streak }) => {
  const t = useTranslation();
  const { lang, setLang } = useContext(LanguageContext);
  const [showAllDeeds, setShowAllDeeds] = useState(false);
  const today = new Date().toDateString();
  const todayDeeds = deeds.filter(d => d.date === today);
  const todayPoints = todayDeeds.reduce((sum, d) => sum + d.points, 0);
  const phase = PHASES[stage.phase];
  const progress = getProgress(totalPoints);

  if (showAllDeeds) {
    return <AllDeedsScreen deeds={deeds} onClose={() => setShowAllDeeds(false)} />;
  }

  return (
    <div className="px-3 sm:px-4 pt-4 sm:pt-6 pb-28 sm:pb-32">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">✨ {t('appName')}</h1>
          <p className="text-gray-500 text-[11px] sm:text-xs truncate">
            {new Date().toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <LanguageToggle lang={lang} setLang={setLang} />
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-2 sm:px-3 py-1 rounded-xl shadow">
            <span className="text-base sm:text-lg font-bold">{totalPoints}</span>
            <span className="text-[10px] sm:text-xs block text-emerald-100">{t('points')}</span>
          </div>
        </div>
      </div>

      {/* Streak Display */}
      <div className="mb-3 sm:mb-4">
        <StreakDisplay streak={streak} />
      </div>

      {/* Weekly/Monthly Stats - clickable */}
      <div className="mb-3 sm:mb-4">
        <WeeklyMonthlyStats deeds={deeds} onClick={() => setShowAllDeeds(true)} />
      </div>

      <div className="bg-white rounded-2xl p-2.5 sm:p-3 mb-3 sm:mb-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
            <NaturalisticTree level={stage.level} size="small" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: phase.color + '40', color: phase.color }}>
              {phase.icon} {t(phase.nameKey)}
            </span>
            <p className="text-sm sm:text-base font-bold text-gray-800 truncate">{t(stage.nameKey)}</p>
            {nextStage && (
              <div className="mt-1">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{nextStage.min - totalPoints} {t('toNext')} {t(nextStage.nameKey)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-2.5 sm:p-3 border border-amber-100">
          <span className="text-xl sm:text-2xl">☀️</span>
          <p className="text-lg sm:text-xl font-bold text-orange-600">+{todayPoints}</p>
          <p className="text-[10px] sm:text-xs text-gray-500">{t('today')}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-2.5 sm:p-3 border border-purple-100">
          <span className="text-xl sm:text-2xl">🎯</span>
          <p className="text-lg sm:text-xl font-bold text-purple-600">{todayDeeds.length}</p>
          <p className="text-[10px] sm:text-xs text-gray-500">{t('deeds')}</p>
        </div>
      </div>

      <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3">{t('todayDone')}</h2>
      {todayDeeds.length === 0 ? (
        <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-gray-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-xl overflow-hidden">
            <NaturalisticTree level={stage.level} size="small" />
          </div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">{t('helpGrow')}</p>
          <p className="text-gray-400 text-xs sm:text-sm">{t('addFirst')}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todayDeeds.slice().reverse().slice(0, 4).map(deed => {
            const cat = CATEGORIES.find(c => c.id === deed.category);
            return (
              <div key={deed.id} className="bg-white rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 border border-gray-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0" style={{ backgroundColor: cat?.color + '20' }}>
                  {cat?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-xs sm:text-sm truncate">{deed.action}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">{t(cat?.nameKey)}</p>
                </div>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: cat?.color }}>
                  +{deed.points}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================
// WEATHER SYSTEM
// ============================================

const WEATHER_TYPES = [
  { id: 'sunny', nameKey: 'weather_sunny', icon: '☀️', bgGradient: ['#87CEEB', '#E0F2FE'], treeAnimation: 'none' },
  { id: 'cloudy', nameKey: 'weather_cloudy', icon: '☁️', bgGradient: ['#94A3B8', '#CBD5E1'], treeAnimation: 'gentle' },
  { id: 'rainy', nameKey: 'weather_rainy', icon: '🌧️', bgGradient: ['#64748B', '#94A3B8'], treeAnimation: 'gentle' },
  { id: 'stormy', nameKey: 'weather_stormy', icon: '⛈️', bgGradient: ['#374151', '#4B5563'], treeAnimation: 'strong' },
  { id: 'snowy', nameKey: 'weather_snowy', icon: '🌨️', bgGradient: ['#E2E8F0', '#F1F5F9'], treeAnimation: 'gentle' },
  { id: 'windy', nameKey: 'weather_windy', icon: '💨', bgGradient: ['#7DD3FC', '#BAE6FD'], treeAnimation: 'strong' },
  { id: 'hot', nameKey: 'weather_hot', icon: '🔥', bgGradient: ['#FCD34D', '#FBBF24'], treeAnimation: 'shimmer' },
  { id: 'foggy', nameKey: 'weather_foggy', icon: '🌫️', bgGradient: ['#D1D5DB', '#E5E7EB'], treeAnimation: 'none' },
];

const getRandomWeather = () => WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];

// ============================================
// ANIMATED TREE SCENE - Tree integrated with weather
// ============================================

const AnimatedTreeScene = ({ level, weather }) => {
  const [raindrops, setRaindrops] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [leaves, setLeaves] = useState([]);
  
  // Colors
  const leafDark = '#166534';
  const leafMid = '#22C55E';
  const leafLight = '#4ADE80';
  const leafHighlight = '#86EFAC';
  const trunk = '#78350F';
  const trunkLight = '#A16207';
  
  // Modify colors based on weather
  const getLeafColor = (baseColor) => {
    if (weather.id === 'stormy') return baseColor.replace('#', '#').split('').map((c, i) => i > 0 && i < 4 ? Math.max(0, parseInt(c, 16) - 2).toString(16) : c).join(''); // Darker
    if (weather.id === 'hot') return baseColor; // Normal but shimmer effect
    if (weather.id === 'snowy') return '#9CA3AF'; // Greyish
    return baseColor;
  };
  
  // Generate particles based on weather
  useEffect(() => {
    if (weather.id === 'rainy' || weather.id === 'stormy') {
      const drops = Array.from({ length: weather.id === 'stormy' ? 60 : 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.4 + Math.random() * 0.4,
      }));
      setRaindrops(drops);
    } else {
      setRaindrops([]);
    }
    
    if (weather.id === 'snowy') {
      const flakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 3 + Math.random() * 5,
      }));
      setSnowflakes(flakes);
    } else {
      setSnowflakes([]);
    }
    
    if (weather.id === 'windy' || weather.id === 'stormy') {
      const leafCount = weather.id === 'stormy' ? 12 : 8;
      const lvs = Array.from({ length: leafCount }, (_, i) => ({
        id: i,
        startY: 25 + Math.random() * 35,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 3, // Longer duration for full width
      }));
      setLeaves(lvs);
    } else {
      setLeaves([]);
    }
  }, [weather]);

  const getTreeTransform = () => {
    switch (weather.treeAnimation) {
      case 'gentle': return 'treeSwayGentle 3s ease-in-out infinite';
      case 'strong': return 'treeSwayStrong 1s ease-in-out infinite';
      case 'shimmer': return 'none';
      default: return 'none';
    }
  };
  
  const getTreeFilter = () => {
    if (weather.id === 'hot') return 'brightness(1.1) saturate(1.2)';
    if (weather.id === 'stormy') return 'brightness(0.7)';
    if (weather.id === 'foggy') return 'brightness(0.9) blur(0.5px)';
    if (weather.id === 'rainy') return 'brightness(0.85)';
    return 'none';
  };

  // Render tree based on level (simplified inline version)
  const renderTree = () => {
    const treeStyle = {
      animation: getTreeTransform(),
      filter: getTreeFilter(),
      transformOrigin: 'bottom center',
      transition: 'filter 1s ease',
    };
    
    // For shimmer effect on hot weather
    const shimmerStyle = weather.id === 'hot' ? {
      animation: 'treeShimmer 2s ease-in-out infinite',
    } : {};

    return (
      <g>
        {/* Level 1-2: Seed/Sprout */}
        {level <= 2 && (
          <g>
            {level === 1 && (
              <>
                <ellipse cx="150" cy="255" rx="12" ry="15" fill={trunk} />
                <ellipse cx="150" cy="253" rx="8" ry="10" fill={trunkLight} />
              </>
            )}
            {level === 2 && (
              <>
                <ellipse cx="150" cy="257" rx="8" ry="10" fill={trunk} />
                <path d="M150 247 Q149 225 150 210" stroke={leafMid} strokeWidth="5" fill="none" strokeLinecap="round" />
                <ellipse cx="140" cy="205" rx="14" ry="10" fill={leafLight} transform="rotate(-25 140 205)" />
                <ellipse cx="160" cy="205" rx="14" ry="10" fill={leafLight} transform="rotate(25 160 205)" />
              </>
            )}
          </g>
        )}
        
        {/* Level 3-4: Small plant */}
        {level >= 3 && level <= 4 && (
          <g>
            <path d={`M150 260 L150 ${210 - level * 8}`} stroke={trunk} strokeWidth={6 + level} strokeLinecap="round" />
            <ellipse cx={125} cy={200 - level * 6} rx={22 + level * 4} ry={16 + level * 3} fill={leafDark} />
            <ellipse cx={175} cy={200 - level * 6} rx={22 + level * 4} ry={16 + level * 3} fill={leafDark} />
            <ellipse cx="150" cy={190 - level * 8} rx={28 + level * 5} ry={20 + level * 4} fill={leafMid} />
            <ellipse cx="150" cy={178 - level * 8} rx={20 + level * 3} ry={14 + level * 3} fill={leafLight} />
          </g>
        )}
        
        {/* Level 5-7: Bush */}
        {level >= 5 && level <= 7 && (
          <g>
            <path d={`M145 260 L142 ${180 - (level-5) * 8} Q150 ${168 - (level-5) * 8} 158 ${180 - (level-5) * 8} L155 260`} fill={trunk} />
            <path d={`M143 ${195 - (level-5) * 5} Q100 ${175 - (level-5) * 5} ${70 - (level-5) * 8} ${185 - (level-5) * 5}`} stroke={trunk} strokeWidth="6" fill="none" />
            <path d={`M157 ${195 - (level-5) * 5} Q200 ${175 - (level-5) * 5} ${230 + (level-5) * 8} ${185 - (level-5) * 5}`} stroke={trunk} strokeWidth="6" fill="none" />
            
            <ellipse cx={65 - (level-5) * 8} cy={180 - (level-5) * 6} rx={32 + (level-5) * 5} ry={26 + (level-5) * 4} fill={leafDark} />
            <ellipse cx={235 + (level-5) * 8} cy={180 - (level-5) * 6} rx={32 + (level-5) * 5} ry={26 + (level-5) * 4} fill={leafDark} />
            <ellipse cx={95} cy={155 - (level-5) * 8} rx={38 + (level-5) * 5} ry={30 + (level-5) * 4} fill={leafMid} />
            <ellipse cx={205} cy={155 - (level-5) * 8} rx={38 + (level-5) * 5} ry={30 + (level-5) * 4} fill={leafMid} />
            <ellipse cx="150" cy={145 - (level-5) * 10} rx={45 + (level-5) * 6} ry={36 + (level-5) * 5} fill={leafLight} />
            <ellipse cx="150" cy={128 - (level-5) * 10} rx={32 + (level-5) * 4} ry={26 + (level-5) * 3} fill={leafHighlight} />
          </g>
        )}
        
        {/* Level 8+: Full tree */}
        {level >= 8 && (
          <g>
            {/* Roots */}
            <path d="M135 260 Q115 265 95 262" stroke={trunk} strokeWidth="8" fill="none" />
            <path d="M165 260 Q185 265 205 262" stroke={trunk} strokeWidth="8" fill="none" />
            
            {/* Trunk */}
            <path d={`M130 260 L120 ${140 - Math.min(level - 8, 8) * 4} Q150 ${120 - Math.min(level - 8, 8) * 4} 180 ${140 - Math.min(level - 8, 8) * 4} L170 260`} fill={trunk} />
            <path d={`M138 258 L130 ${145 - Math.min(level - 8, 8) * 4} Q150 ${128 - Math.min(level - 8, 8) * 4} 170 ${145 - Math.min(level - 8, 8) * 4} L162 258`} fill={trunkLight} />
            
            {/* Branches */}
            <path d={`M125 ${160 - Math.min(level - 8, 4) * 4} Q70 ${130 - Math.min(level - 8, 4) * 4} 25 ${150 - Math.min(level - 8, 4) * 4}`} stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d={`M175 ${160 - Math.min(level - 8, 4) * 4} Q230 ${130 - Math.min(level - 8, 4) * 4} 275 ${150 - Math.min(level - 8, 4) * 4}`} stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
            
            {/* Foliage - changes color based on level */}
            {level < 12 ? (
              // Green foliage
              <>
                <ellipse cx="20" cy={140 - Math.min(level - 8, 4) * 6} rx={40 + Math.min(level - 8, 4) * 3} ry={32 + Math.min(level - 8, 4) * 2} fill={leafDark} />
                <ellipse cx="280" cy={140 - Math.min(level - 8, 4) * 6} rx={40 + Math.min(level - 8, 4) * 3} ry={32 + Math.min(level - 8, 4) * 2} fill={leafDark} />
                <ellipse cx="65" cy={110 - Math.min(level - 8, 4) * 8} rx={45 + Math.min(level - 8, 4) * 3} ry={36 + Math.min(level - 8, 4) * 3} fill={leafMid} />
                <ellipse cx="235" cy={110 - Math.min(level - 8, 4) * 8} rx={45 + Math.min(level - 8, 4) * 3} ry={36 + Math.min(level - 8, 4) * 3} fill={leafMid} />
                <ellipse cx="150" cy={90 - Math.min(level - 8, 4) * 8} rx={55 + Math.min(level - 8, 4) * 4} ry={44 + Math.min(level - 8, 4) * 4} fill={leafLight} />
                <ellipse cx="150" cy={70 - Math.min(level - 8, 4) * 8} rx={40 + Math.min(level - 8, 4) * 3} ry={32 + Math.min(level - 8, 4) * 3} fill={leafHighlight} />
              </>
            ) : level < 14 ? (
              // Autumn/golden foliage for wisdom phase
              <>
                <ellipse cx="20" cy="110" rx="45" ry="36" fill="#EA580C" />
                <ellipse cx="280" cy="110" rx="45" ry="36" fill="#F97316" />
                <ellipse cx="65" cy="80" rx="50" ry="40" fill="#FB923C" />
                <ellipse cx="235" cy="80" rx="50" ry="40" fill="#FDBA74" />
                <ellipse cx="150" cy="60" rx="60" ry="48" fill="#FCD34D" />
                <ellipse cx="150" cy="40" rx="45" ry="36" fill="#FEF3C7" />
              </>
            ) : (
              // Magical/cosmic foliage for legend phase
              <>
                <ellipse cx="20" cy="100" rx="48" ry="38" fill={level >= 16 ? '#7C3AED' : leafDark} />
                <ellipse cx="280" cy="100" rx="48" ry="38" fill={level >= 16 ? '#7C3AED' : leafDark} />
                <ellipse cx="65" cy="70" rx="52" ry="42" fill={level >= 16 ? '#8B5CF6' : leafMid} />
                <ellipse cx="235" cy="70" rx="52" ry="42" fill={level >= 16 ? '#8B5CF6' : leafMid} />
                <ellipse cx="150" cy="50" rx="62" ry="50" fill={level >= 16 ? '#A855F7' : leafLight} />
                <ellipse cx="150" cy="30" rx="48" ry="38" fill={level >= 16 ? '#C4B5FD' : leafHighlight} />
                
                {/* Golden orbs for Tree of Life */}
                {level >= 14 && level < 16 && (
                  <>
                    {[[45, 90], [255, 85], [105, 55], [195, 60], [150, 30]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="10" fill="#FCD34D" />
                    ))}
                  </>
                )}
                
                {/* Stars for cosmic tree */}
                {level >= 16 && (
                  <>
                    {[[45, 80], [255, 75], [95, 50], [205, 55], [150, 25], [125, 65], [175, 60]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="3" fill="white" opacity="0.9" />
                    ))}
                    {/* Cosmic eye */}
                    <circle cx="150" cy="35" r="15" fill="#1E1B4B" opacity="0.8" />
                    <circle cx="150" cy="35" r="10" fill="#8B5CF6" />
                    <circle cx="150" cy="35" r="4" fill="white" />
                  </>
                )}
              </>
            )}
            
            {/* Special elements based on level */}
            {level === 9 && (
              // Cherry blossoms
              <>
                {[[35, 130], [265, 125], [75, 95], [225, 100], [125, 70], [175, 75], [150, 50]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="#F9A8D4" />
                    <circle cx={x} cy={y} r="2.5" fill="#EC4899" />
                  </g>
                ))}
              </>
            )}
            
            {level === 10 && (
              // Apples
              <>
                {[[40, 125], [260, 128], [85, 90], [215, 95], [135, 65], [165, 68], [150, 45]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="8" fill="#DC2626" />
                    <circle cx={x - 2} cy={y - 2} r="3" fill="#FCA5A5" opacity="0.6" />
                  </g>
                ))}
              </>
            )}
          </g>
        )}
      </g>
    );
  };

  return (
    <div 
      className="relative h-56 sm:h-72 overflow-hidden rounded-xl transition-all duration-1000"
      style={{ 
        background: `linear-gradient(to bottom, ${weather.bgGradient[0]}, ${weather.bgGradient[1]})` 
      }}
    >
      {/* Weather overlay elements (HTML for full coverage) */}
      
      {/* Sun for sunny/hot weather */}
      {(weather.id === 'sunny' || weather.id === 'hot') && (
        <div className="absolute top-6 right-8">
          <div 
            className="w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FEF3C7 0%, #FCD34D 60%, transparent 70%)',
              animation: weather.id === 'hot' ? 'sunPulse 2s ease-in-out infinite' : 'none',
            }}
          />
          {weather.id === 'hot' && (
            <div 
              className="absolute inset-0 w-16 h-16 rounded-full bg-orange-300"
              style={{ animation: 'sunGlow 2s ease-in-out infinite' }}
            />
          )}
        </div>
      )}
      
      {/* Moon for stormy/night */}
      {weather.id === 'stormy' && (
        <div className="absolute top-8 right-12 w-10 h-10 rounded-full bg-gray-400/30" />
      )}
      
      {/* Clouds */}
      {(weather.id === 'cloudy' || weather.id === 'rainy' || weather.id === 'stormy' || weather.id === 'snowy') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className={`absolute top-4 w-24 h-10 rounded-full ${weather.id === 'stormy' ? 'bg-gray-600/80' : 'bg-white/70'}`}
            style={{ animation: 'cloudFloat 25s linear infinite', left: '-100px' }}
          />
          <div 
            className={`absolute top-10 w-32 h-12 rounded-full ${weather.id === 'stormy' ? 'bg-gray-700/70' : 'bg-white/60'}`}
            style={{ animation: 'cloudFloat 30s linear infinite', animationDelay: '-10s', left: '-100px' }}
          />
          <div 
            className={`absolute top-6 w-20 h-8 rounded-full ${weather.id === 'stormy' ? 'bg-gray-600/60' : 'bg-white/50'}`}
            style={{ animation: 'cloudFloat 20s linear infinite', animationDelay: '-5s', left: '-100px' }}
          />
        </div>
      )}
      
      {/* Rain drops */}
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-0.5 bg-blue-400/70 rounded-full"
          style={{
            left: `${drop.x}%`,
            top: '-20px',
            height: weather.id === 'stormy' ? '24px' : '16px',
            animation: `rainFall ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white shadow-sm"
          style={{
            left: `${flake.x}%`,
            top: '-15px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snowFall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
      
      {/* Flying leaves */}
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute text-xl pointer-events-none"
          style={{
            top: `${leaf.startY}%`,
            left: '-30px',
            animation: `leafBlow ${leaf.duration}s ease-in-out infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          🍃
        </div>
      ))}
      
      {/* Lightning flash for storm */}
      {weather.id === 'stormy' && (
        <div 
          className="absolute inset-0 bg-white pointer-events-none"
          style={{ animation: 'lightningFlash 4s infinite' }}
        />
      )}
      
      {/* Fog overlay */}
      {weather.id === 'foggy' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
          <div 
            className="absolute inset-0 bg-white/20 pointer-events-none"
            style={{ animation: 'fogDrift 10s ease-in-out infinite' }}
          />
        </>
      )}
      
      {/* Heat shimmer */}
      {weather.id === 'hot' && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to top, rgba(251, 146, 60, 0.4), transparent)',
            animation: 'heatShimmer 2s ease-in-out infinite',
          }}
        />
      )}
      
      {/* Ground - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 400 50" className="w-full h-12" preserveAspectRatio="none">
          <ellipse cx="200" cy="40" rx="250" ry="40" fill={weather.id === 'snowy' ? '#E2E8F0' : '#86EFAC'} />
          <ellipse cx="200" cy="35" rx="220" ry="32" fill={weather.id === 'snowy' ? '#F8FAFC' : '#4ADE80'} />
          {/* Puddles for rain */}
          {weather.id === 'rainy' && (
            <>
              <ellipse cx="100" cy="32" rx="25" ry="6" fill="#60A5FA" opacity="0.5" />
              <ellipse cx="300" cy="34" rx="20" ry="5" fill="#60A5FA" opacity="0.4" />
            </>
          )}
          {/* Snow patches */}
          {weather.id === 'snowy' && (
            <>
              <ellipse cx="80" cy="30" rx="35" ry="10" fill="white" />
              <ellipse cx="320" cy="32" rx="30" ry="8" fill="white" />
            </>
          )}
        </svg>
      </div>
      
      {/* SVG Tree Container - positioned to sit ON the ground */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-40 h-40 sm:w-52 sm:h-52"
        style={{ 
          bottom: '16px',
          animation: getTreeTransform(),
          filter: getTreeFilter(),
          transformOrigin: 'bottom center',
          transition: 'filter 0.5s ease',
        }}
      >
        <TreeIllustration level={level} weather={weather} />
      </div>
      
      {/* Level badge */}
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 rounded-full flex items-center justify-center shadow-lg border border-gray-100">
        <span className="text-[10px] sm:text-xs font-bold text-emerald-700">Lv.{level}</span>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes treeSwayGentle {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          33% { transform: translateX(-50%) rotate(2deg); }
          66% { transform: translateX(-50%) rotate(-2deg); }
        }
        
        @keyframes treeSwayStrong {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(5deg); }
          75% { transform: translateX(-50%) rotate(-5deg); }
        }
        
        @keyframes sunPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes sunGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.3); }
        }
        
        @keyframes cloudFloat {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        
        @keyframes rainFall {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(350px) translateX(-20px); opacity: 0; }
        }
        
        @keyframes snowFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(350px) translateX(50px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes leafBlow {
          0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 0.8; }
          100% { transform: translateX(calc(100vw + 50px)) translateY(-80px) rotate(1080deg); opacity: 0; }
        }
        
        @keyframes lightningFlash {
          0%, 93%, 100% { opacity: 0; }
          94%, 96% { opacity: 0.7; }
          95% { opacity: 0; }
        }
        
        @keyframes fogDrift {
          0%, 100% { transform: translateX(-30px); opacity: 0.2; }
          50% { transform: translateX(30px); opacity: 0.4; }
        }
        
        @keyframes heatShimmer {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(1.15); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

const TreeScreen = ({ totalPoints, weather, showWeatherChange }) => {
  const t = useTranslation();
  const stage = getStage(totalPoints);
  const nextStage = getNextStage(totalPoints);
  const phase = PHASES[stage.phase];
  const progress = getProgress(totalPoints);

  return (
    <div className="px-3 sm:px-4 pt-4 sm:pt-6 pb-28 sm:pb-32">
      {/* Weather change notification */}
      {showWeatherChange && (
        <div className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50 animate-slideDown max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-xl p-2.5 sm:p-3 shadow-lg border border-gray-100 flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">{weather.icon}</span>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500">{t('weather_change')}</p>
              <p className="font-bold text-gray-800 text-sm sm:text-base">{t(weather.nameKey)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">🌳 {t('yourTree')}</h1>
          <p className="text-gray-500 text-[10px] sm:text-xs truncate">{t(stage.descKey)}</p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/80 shadow-sm border border-gray-100">
            {weather.icon} <span className="hidden xs:inline">{t(weather.nameKey)}</span>
          </span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold text-white" style={{ backgroundColor: phase.color }}>
            Lv.{stage.level}
          </span>
        </div>
      </div>

      {/* Animated Tree Scene */}
      <div className="bg-white rounded-2xl mb-3 sm:mb-4 shadow-sm border border-gray-100 overflow-hidden relative">
        <AnimatedTreeScene level={stage.level} weather={weather} />
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-3 sm:p-4 border border-emerald-100">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
            <NaturalisticTree level={stage.level} size="small" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-emerald-600">{t(phase.nameKey)} {t('phase')}</p>
            <p className="text-base sm:text-lg font-bold text-gray-800 truncate">{t(stage.nameKey)}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl sm:text-2xl font-bold text-emerald-600">{totalPoints}</p>
            <p className="text-[10px] sm:text-xs text-gray-500">{t('points')}</p>
          </div>
        </div>
        
        {nextStage ? (
          <div>
            <div className="flex justify-between text-[10px] sm:text-xs mb-1">
              <span className="text-gray-600 truncate">{t('toNext')} {t(nextStage.nameKey)}</span>
              <span className="text-emerald-600 font-medium ml-2">{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 sm:h-3 bg-white rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center">
              {t('stillNeeded')} <span className="font-bold text-emerald-600">{nextStage.min - totalPoints}</span> {t('points')}
            </p>
          </div>
        ) : (
          <div className="text-center py-2">
            <span className="text-2xl sm:text-3xl">🎉</span>
            <p className="text-emerald-700 font-medium text-xs sm:text-sm">{t('maxLevel')}</p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

const CalendarScreen = ({ deeds }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const getDayPoints = (day) => {
    const date = new Date(year, month, day).toDateString();
    return deeds.filter(d => d.date === date).reduce((sum, d) => sum + d.points, 0);
  };

  const getHeatColor = (points) => {
    if (points === 0) return 'bg-gray-100';
    if (points <= 3) return 'bg-emerald-200';
    if (points <= 6) return 'bg-emerald-300';
    if (points <= 10) return 'bg-emerald-400';
    return 'bg-emerald-500';
  };

  return (
    <div className="px-4 pt-6 pb-32">
      <h1 className="text-xl font-bold text-gray-800 mb-4">📅 {t('calendar')}</h1>
      
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">←</button>
        <h2 className="text-lg font-bold text-gray-700">{t('months')[month]} {year}</h2>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {t('weekdays').map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(adjustedFirstDay)].map((_, i) => <div key={`e${i}`} className="aspect-square" />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const points = getDayPoints(day);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          
          return (
            <div key={day} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${getHeatColor(points)} ${isToday ? 'ring-2 ring-emerald-500' : ''}`}>
              <span className={`font-medium ${points > 6 ? 'text-white' : 'text-gray-700'}`}>{day}</span>
              {points > 0 && <span className={`text-xs ${points > 6 ? 'text-white' : 'text-emerald-700'}`}>+{points}</span>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <span>Min</span>
        {['bg-gray-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500'].map((c, i) => (
          <div key={i} className={`w-4 h-4 rounded ${c}`} />
        ))}
        <span>Max</span>
      </div>
    </div>
  );
};

const JourneyScreen = ({ totalPoints }) => {
  const t = useTranslation();
  const currentStage = getStage(totalPoints);

  return (
    <div className="px-4 pt-6 pb-32">
      <h1 className="text-xl font-bold text-gray-800 mb-1">🗺️ {t('journey')}</h1>
      <p className="text-gray-500 text-xs mb-4">{t('journeySubtitle')}</p>

      <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
        {Object.entries(PHASES).map(([key, phase]) => {
          const isCurrentPhase = currentStage.phase === key;
          return (
            <div key={key} className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium ${isCurrentPhase ? 'text-white shadow' : 'bg-white text-gray-600 border border-gray-100'}`} style={{ backgroundColor: isCurrentPhase ? phase.color : undefined }}>
              {phase.icon} {t(phase.nameKey)}
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {STAGES.map((stage, index) => {
          const isCompleted = totalPoints >= stage.min;
          const isCurrent = stage.level === currentStage.level;
          const phase = PHASES[stage.phase];

          return (
            <div key={stage.level} className={`relative flex items-center gap-3 p-3 rounded-xl transition-all ${isCurrent ? 'bg-emerald-100 shadow scale-[1.02] border-2 border-emerald-300' : isCompleted ? 'bg-white border border-gray-100' : 'bg-gray-50 opacity-60'}`}>
              {index < STAGES.length - 1 && (
                <div className={`absolute left-6 top-14 w-0.5 h-4 ${isCompleted && !isCurrent ? 'bg-emerald-300' : 'bg-gray-200'}`} />
              )}
              
              <div className={`w-10 h-10 rounded-lg overflow-hidden ${isCurrent ? 'ring-2 ring-emerald-400' : ''}`}>
                {totalPoints < stage.min ? (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-lg">🔒</div>
                ) : (
                  <NaturalisticTree level={stage.level} size="small" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className={`font-medium text-sm ${isCurrent ? 'text-emerald-800' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                    {t(stage.nameKey)}
                  </p>
                  <span className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: phase.color + '30', color: phase.color }}>
                    {t(phase.nameKey)}
                  </span>
                </div>
                <p className={`text-xs ${isCurrent ? 'text-emerald-600' : 'text-gray-400'}`}>{stage.min} {t('points')}</p>
              </div>

              {isCompleted && !isCurrent && <span className="text-emerald-500">✓</span>}
              {isCurrent && <span className="text-emerald-600 text-xs font-bold px-2 py-0.5 bg-emerald-200 rounded-full">{t('now')}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProfileScreen = ({ totalPoints, deeds, stage, settings, setSettings, onResetData }) => {
  const t = useTranslation();
  const { lang, setLang } = useContext(LanguageContext);
  const phase = PHASES[stage.phase];
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showCategoryStats, setShowCategoryStats] = useState(false);
  
  // Calculate streak and achievements
  const streak = useMemo(() => calculateStreak(deeds), [deeds]);
  const unlockedAchievements = useMemo(() => 
    checkAchievements(deeds, totalPoints, stage, streak), 
    [deeds, totalPoints, stage, streak]
  );
  const unlockedIds = new Set(unlockedAchievements.map(a => a.id));
  const totalAchievements = ALL_ACHIEVEMENTS.length;
  const unlockedCount = unlockedAchievements.length;
  
  if (showCategoryStats) {
    return <CategoryStatisticsScreen deeds={deeds} onBack={() => setShowCategoryStats(false)} />;
  }

  const handleNotificationToggle = async () => {
    if (!settings.notificationsEnabled) {
      // Request permission when enabling notifications
      const granted = await requestNotificationPermission();
      if (granted) {
        setSettings({ ...settings, notificationsEnabled: true });
      } else {
        // Permission was denied or not available
        // Keep notifications disabled
        setSettings({ ...settings, notificationsEnabled: false });
      }
    } else {
      // Disable notifications
      setSettings({ ...settings, notificationsEnabled: false });
    }
  };

  return (
    <div className="px-4 pt-6 pb-32">
      <h1 className="text-xl font-bold text-gray-800 mb-6">👤 {t('profile')}</h1>

      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-white mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl overflow-hidden">
            <NaturalisticTree level={stage.level} size="small" />
          </div>
          <div>
            <p className="text-xs text-emerald-100">{t('level')} {stage.level} • {t(phase.nameKey)}</p>
            <h2 className="text-xl font-bold">{t(stage.nameKey)}</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[[deeds.length, t('deeds')], [totalPoints, t('points')], [stage.level, t('level')]].map(([val, label], i) => (
            <div key={i} className="bg-white/20 rounded-xl p-2 text-center">
              <p className="text-2xl font-bold">{val}</p>
              <p className="text-xs text-emerald-100">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">🏆 {t('achievements')}</h2>
          <span className="text-xs text-gray-500">{unlockedCount}/{totalAchievements}</span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 mb-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {unlockedCount} {t('achievementsUnlocked')}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {ALL_ACHIEVEMENTS.map(achievement => {
            const isUnlocked = unlockedIds.has(achievement.id);
            return (
              <button
                key={achievement.id}
                onClick={() => setSelectedAchievement(achievement)}
                className={`aspect-square rounded-xl p-2 border-2 transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-sm hover:shadow-md' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.emoji}</div>
                {isUnlocked && (
                  <div className="text-[8px] text-gray-600 truncate">
                    {t(achievement.nameKey)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAchievement(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{selectedAchievement.emoji}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {t(selectedAchievement.nameKey)}
              </h3>
              <p className="text-xs text-gray-500">
                {unlockedIds.has(selectedAchievement.id) 
                  ? t(`achievement${selectedAchievement.type.charAt(0).toUpperCase() + selectedAchievement.type.slice(1)}`)
                  : t('achievementLocked')
                }
              </p>
            </div>
            {selectedAchievement.type === 'level' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Bereik level' : 'Reach level'} {selectedAchievement.level}
              </p>
            )}
            {selectedAchievement.type === 'streak' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Houd een streak van' : 'Maintain a streak of'} {selectedAchievement.days} {lang === 'nl' ? 'dagen' : 'days'}
              </p>
            )}
            {selectedAchievement.type === 'category' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Doe' : 'Complete'} {selectedAchievement.count} {lang === 'nl' ? 'daden in' : 'deeds in'} {t(`cat_${selectedAchievement.category}`)}
              </p>
            )}
            {selectedAchievement.type === 'deeds' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Bereik totaal' : 'Reach total'} {selectedAchievement.count} {lang === 'nl' ? 'daden' : 'deeds'}
              </p>
            )}
            {selectedAchievement.type === 'points' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Verdien totaal' : 'Earn total'} {selectedAchievement.count} {lang === 'nl' ? 'punten' : 'points'}
              </p>
            )}
            {selectedAchievement.type === 'special' && (
              <p className="text-sm text-gray-600 text-center">
                {lang === 'nl' ? 'Speciale prestatie' : 'Special achievement'}
              </p>
            )}
            <button 
              onClick={() => setSelectedAchievement(null)}
              className="mt-4 w-full py-2 bg-emerald-500 text-white rounded-xl font-medium"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowCategoryStats(true)}
        className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 mb-3 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <span>📊</span>
          <span className="text-gray-700 font-medium text-sm">{t('statistics')}</span>
        </div>
        <span className="text-gray-400">→</span>
      </button>

      <h2 className="text-base font-bold text-gray-800 mb-3">⚙️ {t('settings')}</h2>
      <div className="space-y-2">
        <button onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <span>🌍</span>
            <span className="text-gray-700 font-medium text-sm">{t('language')}</span>
          </div>
          <span className="text-sm text-gray-500">{lang === 'nl' ? '🇳🇱 Nederlands' : '🇬🇧 English'}</span>
        </button>
        
        <button onClick={handleNotificationToggle} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <span>🔔</span>
            <span className="text-gray-700 font-medium text-sm">{t('notifications')}</span>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${settings.notificationsEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow ${settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
        </button>
        
        {settings.notificationsEnabled && (
          <div className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <span>⏰</span>
              <span className="text-gray-700 font-medium text-sm">{t('notificationTime')}</span>
            </div>
            <input type="time" value={settings.notificationTime} onChange={(e) => setSettings({ ...settings, notificationTime: e.target.value })} className="text-sm text-gray-600 bg-gray-100 rounded-lg px-2 py-1" />
          </div>
        )}
        
        <button onClick={() => setShowResetConfirm(true)} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-red-100">
          <div className="flex items-center gap-3">
            <span>🗑️</span>
            <span className="text-red-600 font-medium text-sm">{t('resetData')}</span>
          </div>
        </button>
      </div>
      
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">🗑️ {t('resetData')}</h3>
            <p className="text-gray-600 text-sm mb-4">{t('resetConfirm')}</p>
            <div className="flex gap-2">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2 bg-gray-100 rounded-xl font-medium text-gray-600">{t('cancel')}</button>
              <button onClick={() => { onResetData(); setShowResetConfirm(false); }} className="flex-1 py-2 bg-red-500 rounded-xl font-medium text-white">{t('reset')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// CATEGORY STATISTICS SCREEN
// ============================================

const CategoryStatisticsScreen = ({ deeds, onBack }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [period, setPeriod] = useState('all');
  
  const stats = useMemo(() => calculateCategoryStats(deeds, period), [deeds, period]);
  const comparison = useMemo(() => {
    if (period === 'all') return null;
    return compareCategoryPeriods(deeds, period, getPreviousPeriod(period));
  }, [deeds, period]);
  const insights = useMemo(() => generateCategoryInsights(stats, comparison, lang, t), [stats, comparison, lang, t]);
  
  return (
    <div className="px-4 pt-6 pb-32">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">📊 {t('statistics')}</h1>
      </div>
      
      {/* Period selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPeriod('week')}
          className={`flex-1 py-2 rounded-xl font-medium text-sm ${
            period === 'week' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {t('thisWeek')}
        </button>
        <button
          onClick={() => setPeriod('month')}
          className={`flex-1 py-2 rounded-xl font-medium text-sm ${
            period === 'month' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {t('thisMonth')}
        </button>
        <button
          onClick={() => setPeriod('all')}
          className={`flex-1 py-2 rounded-xl font-medium text-sm ${
            period === 'all' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {lang === 'nl' ? 'Alles' : 'All'}
        </button>
      </div>
      
      {/* Top categories */}
      {stats.length > 0 ? (
        <>
          <h2 className="text-base font-bold text-gray-800 mb-3">
            {lang === 'nl' ? 'Top Categorieën' : 'Top Categories'}
          </h2>
          <div className="space-y-2 mb-6">
            {stats.slice(0, 5).map(stat => (
              <CategoryStatCard key={stat.category} stat={stat} comparison={comparison} />
            ))}
          </div>
          
          {/* Category distribution */}
          <h2 className="text-base font-bold text-gray-800 mb-3">
            {lang === 'nl' ? 'Verdeling' : 'Distribution'}
          </h2>
          <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
            <CategoryDistributionChart stats={stats} />
          </div>
          
          {/* Insights */}
          {insights.length > 0 && (
            <>
              <h2 className="text-base font-bold text-gray-800 mb-3">
                {lang === 'nl' ? 'Inzichten' : 'Insights'}
              </h2>
              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600">{lang === 'nl' ? 'Nog geen statistieken beschikbaar' : 'No statistics available yet'}</p>
        </div>
      )}
    </div>
  );
};

const CategoryStatCard = ({ stat, comparison }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const comp = comparison?.find(c => c.category === stat.category);
  
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{stat.emoji}</span>
          <span className="font-semibold text-gray-800">{t(stat.name)}</span>
        </div>
        {comp && comp.trend !== 'stable' && (
          <span className={`text-xs font-medium ${
            comp.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
          }`}>
            {comp.trend === 'up' ? '↑' : '↓'} {Math.abs(comp.change)}%
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-lg font-bold" style={{ color: stat.color }}>
          {stat.count}
        </span>
        <span className="text-xs text-gray-500">{t('deeds')}</span>
        <span className="text-sm text-gray-400">•</span>
        <span className="text-sm font-semibold" style={{ color: stat.color }}>
          {stat.points} {t('points')}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${stat.percentage}%`,
            backgroundColor: stat.color
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{stat.percentage}% {lang === 'nl' ? 'van totaal' : 'of total'}</span>
        <span>{stat.avgPoints} {lang === 'nl' ? 'gem. punten' : 'avg points'}</span>
      </div>
    </div>
  );
};

const CategoryDistributionChart = ({ stats }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const total = stats.reduce((sum, s) => sum + s.count, 0);
  
  return (
    <div className="space-y-2">
      {stats.map(stat => {
        const percentage = total > 0 ? (stat.count / total) * 100 : 0;
        return (
          <div key={stat.category} className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-24 flex-shrink-0">
              <span className="text-lg">{stat.emoji}</span>
              <span className="text-xs text-gray-600 truncate">{t(stat.name)}</span>
            </div>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: stat.color
                }}
              >
                {percentage > 10 && (
                  <span className="text-[10px] font-medium text-white">{Math.round(percentage)}%</span>
                )}
              </div>
              {percentage <= 10 && (
              <span className="text-[10px] text-gray-400 ml-1">{Math.round(percentage)}%</span>
            )}
            </div>
            <div className="w-12 text-right text-xs text-gray-600 flex-shrink-0">
              {stat.count}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// GOALS SCREEN
// ============================================

const GoalsScreen = ({ goals, deeds, totalPoints, streak, onAddGoal, onDeleteGoal, onUpdateGoals }) => {
  const t = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const activeGoals = goals.filter(g => !g.completed && (!g.endDate || new Date(g.endDate) >= new Date()));
  const completedGoals = goals.filter(g => g.completed);
  const expiredGoals = goals.filter(g => !g.completed && g.endDate && new Date(g.endDate) < new Date());
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
  };
  
  const getGoalName = (goal) => {
    if (goal.type.includes('category')) {
      return `${goal.target} ${t('deeds')} in ${t(`cat_${goal.category}`)} ${goal.period === 'week' ? t('thisWeek') : t('thisMonth')}`;
    }
    if (goal.type === 'streak_target') {
      return `${t('goalType_streak_target')}: ${goal.target} ${t('dayStreak')}`;
    }
    return `${goal.target} ${goal.type.includes('points') ? t('points') : t('deeds')} ${goal.period === 'week' ? t('thisWeek') : goal.period === 'month' ? t('thisMonth') : ''}`;
  };
  
  return (
    <div className="px-4 pt-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">🎯 {t('myGoals')}</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-shadow"
        >
          + {t('newGoal')}
        </button>
      </div>
      
      {goals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-600 mb-2">{t('noGoals')}</p>
          <p className="text-sm text-gray-500">{t('createFirstGoal')}</p>
        </div>
      ) : (
        <>
          {activeGoals.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">{t('goalActive')}</h2>
              <div className="space-y-3">
                {activeGoals.map(goal => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1">{getGoalName(goal)}</h3>
                          {goal.endDate && (
                            <p className="text-xs text-gray-500">{t('goalDeadline')}: {formatDate(goal.endDate)}</p>
                          )}
                        </div>
                        <button
                          onClick={() => onDeleteGoal(goal.id)}
                          className="text-gray-400 hover:text-red-500 text-lg"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{goal.current} / {goal.target}</span>
                          <span className="text-gray-600">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {completedGoals.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">{t('goalCompleted')}</h2>
              <div className="space-y-2">
                {completedGoals.map(goal => (
                  <div key={goal.id} className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">✅</span>
                          <span className="font-medium text-sm text-gray-800 line-through">{getGoalName(goal)}</span>
                        </div>
                        {goal.completedDate && (
                          <p className="text-xs text-gray-500 mt-1">{formatDate(goal.completedDate)}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onDeleteGoal(goal.id)}
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {expiredGoals.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-800 mb-3">{t('goalExpired')}</h2>
              <div className="space-y-2">
                {expiredGoals.map(goal => (
                  <div key={goal.id} className="bg-gray-50 rounded-xl p-3 border border-gray-200 opacity-60">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-600">{getGoalName(goal)}</span>
                        {goal.endDate && (
                          <p className="text-xs text-gray-500 mt-1">{t('goalDeadline')}: {formatDate(goal.endDate)}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onDeleteGoal(goal.id)}
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {showCreateModal && (
        <CreateGoalModal
          onSave={(goal) => {
            onAddGoal(goal);
            setShowCreateModal(false);
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

const CreateGoalModal = ({ onSave, onClose }) => {
  const t = useTranslation();
  const [goalType, setGoalType] = useState('deeds_week');
  const [target, setTarget] = useState(5);
  const [period, setPeriod] = useState('week');
  const [category, setCategory] = useState(null);
  
  const goalTypes = [
    { value: 'deeds_week', label: t('goalType_deeds_week') },
    { value: 'deeds_month', label: t('goalType_deeds_month') },
    { value: 'deeds_continuous', label: t('goalType_deeds_continuous') },
    { value: 'points_week', label: t('goalType_points_week') },
    { value: 'points_month', label: t('goalType_points_month') },
    { value: 'points_continuous', label: t('goalType_points_continuous') },
    { value: 'category_week', label: t('goalType_category_week') },
    { value: 'category_month', label: t('goalType_category_month') },
    { value: 'streak_target', label: t('goalType_streak_target') },
  ];
  
  const periods = [
    { value: 'week', label: t('goalPeriod_week') },
    { value: 'month', label: t('goalPeriod_month') },
    { value: 'continuous', label: t('goalPeriod_continuous') },
  ];
  
  const handleSave = () => {
    const goal = createGoal(goalType, target, category, period);
    onSave(goal);
  };
  
  const needsCategory = goalType.includes('category');
  const needsPeriod = !goalType.includes('continuous') && goalType !== 'streak_target';
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('createGoal')}</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('goalType')}</label>
            <select
              value={goalType}
              onChange={(e) => {
                setGoalType(e.target.value);
                if (!e.target.value.includes('category')) setCategory(null);
                if (e.target.value.includes('continuous') || e.target.value === 'streak_target') {
                  setPeriod('continuous');
                } else {
                  setPeriod(goalType.includes('week') ? 'week' : 'month');
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {goalTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          {needsCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('goalCategory')}</label>
              <select
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">{t('category')}</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.emoji} {t(cat.nameKey)}</option>
                ))}
              </select>
            </div>
          )}
          
          {needsPeriod && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('goalPeriod')}</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {periods.filter(p => p.value !== 'continuous' || goalType.includes('continuous')).map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('goalTarget')}</label>
            <input
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-100 rounded-xl font-medium text-gray-600"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={needsCategory && !category}
            className="flex-1 py-2 bg-emerald-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('saveGrow')}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddDeedScreen = ({ onSave, onClose, nextStage, pointsToNext }) => {
  const t = useTranslation();
  const [action, setAction] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [points, setPoints] = useState(2);
  const [mood, setMood] = useState('😊');

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-teal-100 z-50 overflow-y-auto">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/40 to-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-pink-200/30 to-orange-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-md mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button onClick={onClose} className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm text-sm sm:text-base">✕</button>
          <h1 className="text-base sm:text-lg font-bold text-gray-800">✨ {t('newDeed')}</h1>
          <div className="w-9 sm:w-10" />
        </div>

        {nextStage && pointsToNext <= 15 && (
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 flex items-center gap-2 border border-amber-200">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
              <NaturalisticTree level={nextStage.level} size="small" />
            </div>
            <p className="text-[10px] sm:text-xs text-amber-800">
              {t('stillNeeded')} <span className="font-bold">{pointsToNext}</span> {t('points')} {t('until')} {t(nextStage.nameKey)}!
            </p>
          </div>
        )}

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">{t('whatDidYouDo')}</label>
          <input type="text" value={action} onChange={(e) => setAction(e.target.value)} placeholder={t('describeDeed')} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-sm text-sm sm:text-base" />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">{t('category')}</label>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat); setPoints(cat.defaultPoints); }} className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all ${selectedCategory?.id === cat.id ? 'border-emerald-400 bg-emerald-50 scale-105' : 'border-gray-100 bg-white'}`}>
                <span className="text-lg sm:text-xl block">{cat.emoji}</span>
                <span className="text-[8px] sm:text-[10px] font-medium text-gray-700 leading-tight block truncate">{t(cat.nameKey)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">{t('impact')}: <span className="text-emerald-600">{points} {t('points')}</span></label>
          <div className="flex gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} onClick={() => setPoints(p)} className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${points === p ? 'bg-emerald-500 text-white' : 'bg-white text-gray-500'}`}>{p}</button>
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">{t('howFelt')}</label>
          <div className="flex gap-1.5 sm:gap-2 justify-center flex-wrap">
            {MOODS.map(m => (
              <button key={m} onClick={() => setMood(m)} className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-lg sm:text-xl transition-all ${mood === m ? 'bg-white shadow-lg scale-110' : 'bg-white/50'}`}>{m}</button>
            ))}
          </div>
        </div>

        <button onClick={() => { if (action.trim() && selectedCategory) { onSave({ id: Date.now(), action: action.trim(), category: selectedCategory.id, points, mood, date: new Date().toDateString() }); onClose(); }}} disabled={!action.trim() || !selectedCategory} className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all text-sm sm:text-base ${action.trim() && selectedCategory ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
          {t('saveGrow')} 🌱
        </button>
      </div>
    </div>
  );
};

// Demo data generator
const generateDemoDeeds = () => {
  const deeds = [];
  const today = new Date();
  for (let daysAgo = 10; daysAgo >= 0; daysAgo--) {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    const numDeeds = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numDeeds; i++) {
      const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      deeds.push({
        id: Date.now() + Math.random(),
        action: ['Iemand geholpen', 'Afval opgeruimd', 'Compliment gegeven', 'Vrijwilliger', 'Gezond gegeten'][Math.floor(Math.random() * 5)],
        category: cat.id,
        points: Math.floor(Math.random() * 4) + 1,
        mood: MOODS[Math.floor(Math.random() * MOODS.length)],
        date: date.toDateString()
      });
    }
  }
  return deeds;
};

// Main App
export default function App() {
  // Load state from localStorage
  const [lang, setLang] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.SETTINGS, { lang: 'en' });
    return saved.lang || 'en';
  });
  const [activeTab, setActiveTab] = useState('home');
  const [showAddDeed, setShowAddDeed] = useState(false);
  const [deeds, setDeeds] = useState(() => loadFromStorage(STORAGE_KEYS.DEEDS, []));
  const [settings, setSettings] = useState(() => loadFromStorage(STORAGE_KEYS.SETTINGS, {
    lang: 'en',
    notificationsEnabled: false,
    notificationTime: '20:00',
  }));
  const [showOnboarding, setShowOnboarding] = useState(() => !loadFromStorage(STORAGE_KEYS.ONBOARDING, false));
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastLevel, setLastLevel] = useState(() => loadFromStorage(STORAGE_KEYS.LAST_LEVEL, 1));
  const [lastNotificationDate, setLastNotificationDate] = useState(() => 
    loadFromStorage(STORAGE_KEYS.LAST_NOTIFICATION, null)
  );
  
  // Weather system state
  const [weather, setWeather] = useState(() => WEATHER_TYPES[0]); // Start sunny
  const [showWeatherChange, setShowWeatherChange] = useState(false);

  // Toast system
  const { toasts, showToast, removeToast } = useToast(lang);
  const [previousStreak, setPreviousStreak] = useState(() => {
    // Initialize with current streak to avoid false triggers on first load
    const initialStreak = calculateStreak(deeds);
    return initialStreak.current;
  });
  
  // Achievements tracking
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, []);
    return new Set(saved);
  });
  
  // Goals state
  const [goals, setGoals] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.GOALS, []);
    return saved.map(goal => ({
      ...goal,
      // Ensure dates are strings
      startDate: goal.startDate || getStartOfWeek(),
      endDate: goal.endDate || null,
    }));
  });

  // Computed values
  const totalPoints = useMemo(() => deeds.reduce((sum, d) => sum + d.points, 0), [deeds]);
  const stage = useMemo(() => getStage(totalPoints), [totalPoints]);
  const nextStage = useMemo(() => getNextStage(totalPoints), [totalPoints]);
  const pointsToNext = nextStage ? nextStage.min - totalPoints : 0;
  const streak = useMemo(() => calculateStreak(deeds), [deeds]);

  // Save to localStorage
  useEffect(() => { saveToStorage(STORAGE_KEYS.DEEDS, deeds); }, [deeds]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.SETTINGS, { ...settings, lang }); }, [settings, lang]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.GOALS, goals); }, [goals]);
  
  // Update goals progress and reset for new periods
  useEffect(() => {
    const updatedGoals = updateGoalProgress(goals, deeds, totalPoints, streak);
    const resetGoals = resetGoalsForNewPeriod(updatedGoals);
    setGoals(resetGoals);
    
    // Check for goal completions and milestones
    resetGoals.forEach(goal => {
      const wasCompleted = goals.find(g => g.id === goal.id)?.completed;
      if (goal.completed && !wasCompleted) {
        setTimeout(() => showToast('goalCompletedToast', '🎉'), 500);
      } else if (!goal.completed && goal.current >= goal.target * 0.5 && goal.current < goal.target * 0.6) {
        // Show toast at 50% (only once)
        const previousGoal = goals.find(g => g.id === goal.id);
        if (!previousGoal || previousGoal.current < goal.target * 0.5) {
          setTimeout(() => showToast('goalHalfwayToast', '💪'), 500);
        }
      }
    });
  }, [deeds, totalPoints, streak.current]);
  useEffect(() => {
    if (streak.current > 0) {
      const saved = loadFromStorage(STORAGE_KEYS.STREAK, { record: 0 });
      if (streak.current > saved.record) saveToStorage(STORAGE_KEYS.STREAK, { record: streak.current });
    }
  }, [streak]);

  // Level up check
  useEffect(() => {
    if (stage.level > lastLevel) {
      // Speel level-up fanfare
      playLevelUpSound();
      
      setShowLevelUp(true);
      setLastLevel(stage.level);
      saveToStorage(STORAGE_KEYS.LAST_LEVEL, stage.level);
      // Show toast for level up
      showToast('toast_levelUp', '🎉');
    }
  }, [stage.level, lastLevel, showToast]);

  // Streak milestone check - only trigger when streak increases
  useEffect(() => {
    const currentStreak = streak.current;
    // Only show toast if streak increased (not on initial load)
    if (currentStreak > previousStreak && currentStreak > 0 && previousStreak > 0) {
      // Check for milestone streaks
      if (currentStreak === 3) {
        showToast('toast_streak3', '🔥');
      } else if (currentStreak === 7) {
        showToast('toast_streak7', '💪');
      } else if (currentStreak === 30) {
        showToast('toast_streak30', '🌟');
      } else if (currentStreak === 100) {
        showToast('toast_streak100', '🏆');
      }
    }
    // Always update previous streak to current
    if (currentStreak !== previousStreak) {
      setPreviousStreak(currentStreak);
    }
  }, [streak.current, previousStreak, showToast]);

  // Check for new achievements
  useEffect(() => {
    const currentUnlocked = checkAchievements(deeds, totalPoints, stage, streak);
    const currentIds = new Set(currentUnlocked.map(a => a.id));
    const previousIds = unlockedAchievementIds;
    
    // Find newly unlocked achievements
    const newlyUnlocked = currentUnlocked.filter(a => !previousIds.has(a.id));
    
    if (newlyUnlocked.length > 0) {
      // Save updated achievements
      setUnlockedAchievementIds(currentIds);
      saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, Array.from(currentIds));
      
      // Show toast for first new achievement
      const firstNew = newlyUnlocked[0];
      const achievementName = translations[lang]?.[firstNew.nameKey] || translations['en']?.[firstNew.nameKey] || firstNew.nameKey;
      setTimeout(() => {
        showToast(`🏆 ${achievementName}`, firstNew.emoji);
      }, 500);
    }
  }, [deeds, totalPoints, stage.level, streak.current, unlockedAchievementIds, showToast, lang]);

  // Weather change timer - changes every 30-60 seconds
  useEffect(() => {
    const changeWeather = () => {
      const newWeather = getRandomWeather();
      if (newWeather.id !== weather.id) {
        setWeather(newWeather);
        setShowWeatherChange(true);
        // Hide notification after 3 seconds
        setTimeout(() => setShowWeatherChange(false), 3000);
      }
    };
    
    // Initial weather change after 10 seconds
    const initialTimeout = setTimeout(changeWeather, 10000);
    
    // Then change every 30-60 seconds
    const interval = setInterval(() => {
      changeWeather();
    }, 30000 + Math.random() * 30000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [weather.id]);

  // Notification scheduler - checks every minute if it's time to send a notification
  useEffect(() => {
    if (!settings.notificationsEnabled) return;
    
    // Check if notifications are supported and permission is granted
    if (!('Notification' in window)) {
      console.warn('Notifications are not supported in this browser');
      return;
    }
    
    if (Notification.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    const checkAndSendNotification = () => {
      // Double-check permission before sending
      if (Notification.permission !== 'granted') {
        return;
      }
      
      if (shouldSendNotification(settings.notificationTime, lastNotificationDate)) {
        try {
          sendNotification(lang);
          const now = new Date().toISOString();
          setLastNotificationDate(now);
          saveToStorage(STORAGE_KEYS.LAST_NOTIFICATION, now);
        } catch (error) {
          console.error('Error in notification scheduler:', error);
        }
      }
    };

    // Check immediately when component mounts or settings change
    checkAndSendNotification();

    // Then check every minute
    const interval = setInterval(checkAndSendNotification, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [settings.notificationsEnabled, settings.notificationTime, lastNotificationDate, lang]);

  // Handlers
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    saveToStorage(STORAGE_KEYS.ONBOARDING, true);
  };

  const handleOnboardingLangChange = (newLang) => {
    setLang(newLang);
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...settings, lang: newLang });
  };

  const handleResetData = () => {
    setDeeds([]);
    setLastLevel(1);
    setGoals([]);
    saveToStorage(STORAGE_KEYS.DEEDS, []);
    saveToStorage(STORAGE_KEYS.LAST_LEVEL, 1);
    saveToStorage(STORAGE_KEYS.STREAK, { record: 0 });
    saveToStorage(STORAGE_KEYS.GOALS, []);
  };
  
  const handleAddGoal = (goal) => {
    setGoals(prev => [...prev, goal]);
  };
  
  const handleDeleteGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const handleAddDeed = (deed) => {
    // Speel success jingle
    playSuccessSound();
    
    setDeeds(prev => [...prev, deed]);
    // 50% motivational message, 30% "Good deed added", 20% no message
    const random = Math.random();
    if (random < 0.5) {
      // 50% chance: Show motivational toast
      const motivationalKeys = [
        'toast_motivational1', 'toast_motivational2', 'toast_motivational3',
        'toast_motivational4', 'toast_motivational5', 'toast_motivational6',
        'toast_motivational7', 'toast_motivational8'
      ];
      const randomKey = motivationalKeys[Math.floor(Math.random() * motivationalKeys.length)];
      showToast(randomKey);
    } else if (random < 0.8) {
      // 30% chance: Show "Good deed added" message
      showToast('toast_deedAdded', '🌱');
    }
    // 20% chance: No message shown (do nothing)
  };

  // Show onboarding for new users
  if (showOnboarding) {
    return (
      <OnboardingScreen 
        onComplete={handleOnboardingComplete} 
        initialLang={lang}
        onLangChange={handleOnboardingLangChange}
      />
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50">
        {/* Decorative background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-200/30 to-orange-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-pink-200/25 to-rose-200/20 rounded-full blur-3xl translate-x-1/3" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-200/25 to-teal-200/20 rounded-full blur-3xl -translate-x-1/4" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-200/20 to-indigo-200/15 rounded-full blur-3xl translate-y-1/3" />
        </div>
        
        {/* Mobile-first container with max-width for larger screens */}
        <div className="max-w-md mx-auto relative min-h-screen">
          {activeTab === 'home' && <HomeScreen deeds={deeds} totalPoints={totalPoints} stage={stage} nextStage={nextStage} streak={streak} />}
          {activeTab === 'tree' && <TreeScreen totalPoints={totalPoints} weather={weather} showWeatherChange={showWeatherChange} />}
          {activeTab === 'calendar' && <CalendarScreen deeds={deeds} />}
          {activeTab === 'journey' && <JourneyScreen totalPoints={totalPoints} />}
          {activeTab === 'goals' && <GoalsScreen goals={goals} deeds={deeds} totalPoints={totalPoints} streak={streak} onAddGoal={handleAddGoal} onDeleteGoal={handleDeleteGoal} onUpdateGoals={setGoals} />}
          {activeTab === 'profile' && <ProfileScreen totalPoints={totalPoints} deeds={deeds} stage={stage} settings={settings} setSettings={setSettings} onResetData={handleResetData} />}

          {!showAddDeed && <FAB onClick={() => setShowAddDeed(true)} />}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {showAddDeed && <AddDeedScreen onSave={handleAddDeed} onClose={() => setShowAddDeed(false)} nextStage={nextStage} pointsToNext={pointsToNext} />}
          {showLevelUp && <LevelUpModal stage={stage} onClose={() => setShowLevelUp(false)} />}
          
          {/* Toast notifications */}
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
