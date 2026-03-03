import { Component } from '@angular/core';

interface FamilyMember {
  name: string;
  role: string;
  dateOfBirth: string;
}

interface UserProfile {
  name: string;
  email: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <div class="page-content">
      <div class="page-header">
        <span class="section-icon">👤</span>
        <div>
          <h1>Profile &amp; Family</h1>
          <p>View and manage your profile, family members, and settings.</p>
        </div>
      </div>

      <!-- Family Section -->
      <section class="card">
        <div class="card-header">
          <h2>🏠 Family</h2>
        </div>
        <div class="card-body">
          <table class="family-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              @for (member of familyMembers; track member.name) {
                <tr>
                  <td>{{ member.name }}</td>
                  <td><span class="role-badge">{{ member.role }}</span></td>
                  <td>{{ member.dateOfBirth }}</td>
                </tr>
              }
            </tbody>
          </table>
          <button class="btn-add">＋ Add new family member</button>
        </div>
      </section>

      <!-- Profile Section -->
      <section class="card">
        <div class="card-header">
          <h2>👤 Profile</h2>
        </div>
        <div class="card-body">
          <div class="profile-fields">
            <div class="profile-field">
              <span class="field-label">Name</span>
              <span class="field-value">{{ userProfile.name }}</span>
            </div>
            <div class="profile-field">
              <span class="field-label">Email</span>
              <span class="field-value">{{ userProfile.email }}</span>
            </div>
            <div class="profile-field">
              <span class="field-label">Username</span>
              <span class="field-value">{{ userProfile.username }}</span>
            </div>
            <div class="profile-field">
              <span class="field-label">Password</span>
              <span class="field-value masked">••••••••••••</span>
            </div>
            <div class="profile-field">
              <span class="field-label">Role</span>
              <span class="field-value"><span class="role-badge">{{ userProfile.role }}</span></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Settings Section -->
      <section class="card">
        <div class="card-header">
          <h2>⚙️ Settings</h2>
        </div>
        <div class="card-body">
          <div class="settings-empty">
            <span>⚙️</span>
            Settings coming soon.
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-content { width: 100%; max-width: 900px; }
    .page-header {
      display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
    }
    .section-icon { font-size: 2.5rem; }
    h1 {
      font-size: 2rem; font-weight: 800;
      background: linear-gradient(135deg, #7c5cbf, #4a90d9);
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; margin-bottom: 4px;
    }
    p { color: #666; font-size: 0.95rem; }

    .card {
      background: #fff; border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,.07);
      margin-bottom: 32px; overflow: hidden;
    }
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px; border-bottom: 1px solid #eee;
    }
    .card-header h2 { font-size: 1.2rem; font-weight: 700; color: #1e1e2e; }
    .card-body { padding: 24px; }

    .family-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .family-table th,
    .family-table td { text-align: left; padding: 12px 16px; font-size: 0.93rem; }
    .family-table th {
      font-weight: 700; color: #888; font-size: 0.8rem;
      text-transform: uppercase; letter-spacing: 0.05em;
      border-bottom: 2px solid #eee;
    }
    .family-table td { border-bottom: 1px solid #f0f2f5; color: #1e1e2e; }
    .family-table tr:last-child td { border-bottom: none; }

    .role-badge {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 0.78rem; font-weight: 600;
      background: rgba(124,92,191,.12); color: #7c5cbf;
    }

    .btn-add {
      display: inline-flex; align-items: center; gap: 6px;
      background: none; border: 2px dashed #c4b5f0; border-radius: 8px;
      padding: 9px 18px; font-size: 0.9rem; font-weight: 600;
      color: #7c5cbf; cursor: pointer; transition: background .15s, border-color .15s;
    }
    .btn-add:hover { background: rgba(124,92,191,.07); border-color: #7c5cbf; }

    .profile-fields { display: flex; flex-direction: column; gap: 0; }
    .profile-field {
      display: flex; align-items: center;
      padding: 12px 0; border-bottom: 1px solid #f0f2f5;
    }
    .profile-field:last-child { border-bottom: none; }
    .field-label {
      width: 160px; font-size: 0.82rem; font-weight: 700;
      color: #888; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0;
    }
    .field-value { font-size: 0.95rem; color: #1e1e2e; }
    .field-value.masked { letter-spacing: 0.15em; color: #aaa; }

    .settings-empty {
      text-align: center; padding: 40px 24px;
      color: #bbb; font-size: 0.95rem;
    }
    .settings-empty span { font-size: 2rem; display: block; margin-bottom: 10px; }
  `]
})
export class Profile {
  familyMembers: FamilyMember[] = [
    { name: 'James Johnson',  role: 'Father',   dateOfBirth: 'March 14, 1978'    },
    { name: 'Sarah Johnson',  role: 'Mother',   dateOfBirth: 'July 22, 1980'     },
    { name: 'Ethan Johnson',  role: 'Son',      dateOfBirth: 'September 5, 2005' },
    { name: 'Lily Johnson',   role: 'Daughter', dateOfBirth: 'February 18, 2009' },
    { name: 'Noah Johnson',   role: 'Son',      dateOfBirth: 'April 3, 2012'     },
    { name: 'Ava Johnson',    role: 'Daughter', dateOfBirth: 'November 9, 2015'  },
  ];

  userProfile: UserProfile = {
    name:     'James Johnson',
    email:    'james.johnson@example.com',
    username: 'jamesjohnson',
    role:     'Father',
  };
}
