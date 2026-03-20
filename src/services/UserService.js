// services/UserService.js

const DEV_MODE = true;
const STORAGE_KEY = 'bourso_users_data';
const DATA_VERSION = 1;

class UserService {
  constructor() {
    if (DEV_MODE) console.log('🔧 UserService initialisé - Version', DATA_VERSION);
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedVersion = localStorage.getItem(STORAGE_KEY + '_version');

      if (stored && storedVersion === String(DATA_VERSION)) {
        this.users = JSON.parse(stored);
        if (DEV_MODE) console.log('📦 Chargé depuis localStorage:', this.users.length, 'utilisateurs');
      } else {
        this.users = this.getDefaultUsers();
        this.saveToStorage();
      }
    } catch (error) {
      this.users = this.getDefaultUsers();
      this.saveToStorage();
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
      localStorage.setItem(STORAGE_KEY + '_version', String(DATA_VERSION));
    } catch (error) {
      if (DEV_MODE) console.error('❌ Erreur sauvegarde:', error);
    }
  }

  getDefaultUsers() {
    return [
      {
        id: 1,
        username: '07014860',
        password: '260823',

        // ===== IDENTITÉ =====
        name: 'M. BESSOT--LACOUR Frederic',
        email: 'frederic.bessot@email.com',
        phone: '+33 6 12 34 56 78',

        // ===== ADRESSE (affichée dans le RIB) =====
        address: '20 RUE NICOLAS LARBAUD',
        postalCode: '03200',
        city: 'VICHY',
        country: 'France',
        location: 'Vichy, France',

        // ===== COMPTE =====
        accountNumber: '20250000001',
        manager: 'Sophie Martin',
        balance: 5800.10,
        isBlocked: false,
        canTransferWhenBlocked: false,
        unlockFee: null,
        blockReason: null,

        // ===== RIB =====
        rib: {
          iban: 'FR76 4061 8804 7700 0408 7555 560',
          bic: 'BOUSFRPPXXX',
          bankCode: '40618',
          branchCode: '80477',
          accountNumber: '00408755556',
          key: '0',
          domiciliation: 'BoursoBank',
          domiciliationAddress: '44 rue Traversière, CS 80134, 92772',
          domiciliationCity: 'BOULOGNE-BILLANCOURT CEDEX, FRANCE',
        },

        // ===== CARTES =====
        cards: [
          {
            id: 1,
            type: 'Visa Premier',
            cardNumber: '4567 8912 3456 7890',
            maskedNumber: '4567 **** **** 7890',
            cvv: '123',
            expiryDate: '12/25',
            status: 'active',
            dailyWithdrawalLimit: 500,
            weeklyPaymentLimit: 2000,
            internationalPaymentEnabled: true,
            issueDate: '12/2022',
            cardHolder: 'BESSOT--LACOUR FREDERIC'
          }
        ],

        // ===== COMPTES =====
        accounts: [
          { id: 1, type: 'Compte Courant', number: 'N°*******7890', balance: 300978000.10, icon: 'wallet' },
          { id: 2, type: 'Livret A', number: 'N°*******5462', balance: 30000.40, icon: 'piggybank' },
          { id: 3, type: 'Plan Épargne', number: 'N°*******8891', balance: 50000.17, icon: 'trending' }
        ],

        // ===== TRANSACTIONS =====
        transactions: [
          { id: 1, type: 'Virement en attente', date: '20 Mar 2026', reference: 'Thomas Mercier', amount: 4000.00, isCredit: false, status: 'pending' },
          { id: 2, type: 'Virement sortant', date: '19 Mar 2026', reference: 'Sophie Blanchard', amount: 7000.00, isCredit: false, status: 'done' },
          { id: 3, type: 'Virement sortant', date: '18 Mar 2026', reference: 'Marie Fontaine', amount: 5000.00, isCredit: false, status: 'done' },
          { id: 4, type: 'Virement sortant', date: '17 Mar 2026', reference: 'Lucas Petit', amount: 2000.00, isCredit: false, status: 'done' },
          { id: 5, type: 'Achat carte', date: '16 Mar 2026', reference: 'CARREFOUR VICHY', amount: 85.50, isCredit: false, status: 'done' },
          { id: 6, type: 'Achat carte', date: '15 Mar 2026', reference: 'UBER VICHY', amount: 45.20, isCredit: false, status: 'done' },
          { id: 7, type: 'Retrait ATM', date: '14 Mar 2026', reference: 'ATM BOURSO VICHY', amount: 100.00, isCredit: false, status: 'done' },
          { id: 8, type: 'Achat carte', date: '13 Mar 2026', reference: 'FNAC VICHY', amount: 156.80, isCredit: false, status: 'done' },
          { id: 9, type: 'Achat carte', date: '12 Mar 2026', reference: 'AMAZON FRANCE', amount: 67.99, isCredit: false, status: 'done' },
          { id: 10, type: 'Retrait ATM', date: '11 Mar 2026', reference: 'ATM BOURSO GARE', amount: 200.00, isCredit: false, status: 'done' }
        ],

        expenses: {
          month: 'Mars 2026',
          categories: [
            { name: 'Logement', value: 45, color: '#3B82F6' },
            { name: 'Alimentation', value: 25, color: '#10B981' },
            { name: 'Transport', value: 10, color: '#F97316' },
            { name: 'Loisirs', value: 12, color: '#6366F1' },
            { name: 'Autres', value: 8, color: '#D1D5DB' }
          ]
        },
        notifications: 2,
        chequier: 5,
        virementRapide: 10,
        virementProgramme: 3
      }
    ];
  }

  async authenticate(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error('Identifiant et mot de passe requis'));
          return;
        }
        if (!/^\d{8}$/.test(username)) {
          reject(new Error('L\'identifiant doit contenir 8 chiffres'));
          return;
        }
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Identifiant ou mot de passe incorrect'));
        }
      }, 800);
    });
  }

  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utilisateur non trouvé'));
        }
      }, 100);
    });
  }

  async createTransfer(userId, transferData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utilisateur non trouvé')); return; }
        if (user.isBlocked && !user.canTransferWhenBlocked) {
          reject(new Error('Compte bloqué, virement impossible'));
          return;
        }
        if (user.balance < transferData.amount) {
          reject(new Error('Solde insuffisant'));
          return;
        }

        user.balance -= transferData.amount;
        const compteCourant = user.accounts.find(acc => acc.type === 'Compte Courant');
        if (compteCourant) compteCourant.balance -= transferData.amount;

        const newTransaction = {
          id: Date.now(),
          type: 'Virement sortant',
          date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
          reference: transferData.iban ? `${transferData.iban.substring(0, 4)} *** ${transferData.iban.slice(-3)}` : 'Virement',
          amount: transferData.amount,
          isCredit: false
        };

        user.transactions.unshift(newTransaction);
        this.saveToStorage();
        resolve({ success: true, newBalance: user.balance, transaction: newTransaction });
      }, 1000);
    });
  }

  async getUserCards(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) resolve(user.cards || []);
        else reject(new Error('Utilisateur non trouvé'));
      }, 500);
    });
  }

  async toggleCardStatus(userId, cardId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) { reject(new Error('Utilisateur non trouvé')); return; }
        const card = user.cards.find(c => c.id === cardId);
        if (!card) { reject(new Error('Carte non trouvée')); return; }
        card.status = card.status === 'active' ? 'blocked' : 'active';
        this.saveToStorage();
        resolve(card);
      }, 1000);
    });
  }

  async updateUser(userId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.users[userIndex], ...updates };
          this.saveToStorage();
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Utilisateur non trouvé'));
        }
      }, 500);
    });
  }
}

export default new UserService();