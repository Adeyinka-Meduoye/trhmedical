# TRH Medical Organisation - Technical Architecture Blueprint

## 1. Executive Summary
This document outlines the technical architecture for the TRH Medical Organisation digital platform. The system is designed to facilitate medical coverage during church services, coordinate emergency responses, manage volunteers, and oversee workforce health.

## 2. Tech Stack Recommendation
**Selected Architecture: React (Vite) + Supabase**

*   **Frontend**: React 19 (High performance, rich ecosystem, component-based).
*   **Styling**: Tailwind CSS (Rapid UI development, mobile-first).
*   **Backend/Database**: Supabase (PostgreSQL).
    *   *Why?* Provides out-of-the-box Authentication, Real-time subscriptions (critical for emergency dashboards), and secure Row Level Security (RLS) for medical data privacy. It requires less maintenance than a custom Node.js server.
*   **Hosting**: Cloud Run (Containerized) or Vercel/Netlify (Static).
*   **Icons**: Lucide React.
*   **Animation**: Framer Motion.

## 3. WhatsApp Emergency System Architecture

### 3.1. Emergency Button Logic
*   **Visibility**: Fixed floating action button (FAB) on bottom-right (z-index: 9999).
*   **Behavior**:
    1.  User clicks button.
    2.  Modal opens asking for basic triage info (optional but recommended for better routing):
        *   "Are you: Member / Workforce / Visitor?"
        *   "Location in building?"
    3.  System constructs WhatsApp URL scheme.
    4.  Redirects to WhatsApp app.

### 3.2. Routing Architecture (Option B: Medical WhatsApp Group)
*   **Recommendation**: **Option B (Medical WhatsApp Group)** for MVP.
    *   *Reasoning*: It ensures multiple medical team members see the alert immediately. Single numbers (Option A) create a single point of failure. API (Option C) is costly and complex for Phase 1.
*   **Implementation**: The "Click-to-Chat" link targets a specific triage phone number held by the Head of Medical on duty, OR a WhatsApp Group Invite link (though direct messaging a triage officer is safer to avoid spam).
*   **Refined Approach**: Target a **Dedicated Emergency Triage Device** carried by the shift leader.

### 3.3. Message Template
```text
URGENT: TRH Medical Assistance Request
-------------------------------------
Type: [Member/Workforce/Visitor]
Location: [e.g., Main Auditorium, Gallery]
Phone: [User Phone]
Nature: [User Input]
```

## 4. Database Schema (Relational - PostgreSQL)

### 4.1. Core Tables
*   **`profiles`** (Extends Auth): `id`, `full_name`, `role` (admin, medical_staff, workforce, member), `phone`, `avatar_url`.
*   **`volunteers`**: `id`, `profile_id`, `profession` (Doctor, Nurse, EMT), `license_number`, `specialization`, `years_experience`, `status` (pending, approved), `availability_json`.
*   **`incidents`**: `id`, `date`, `service_type`, `location`, `patient_category`, `symptoms`, `intervention`, `medication`, `outcome`, `reported_by` (FK).
*   **`health_checks`**: `id`, `user_id` (Workforce), `type` (BP, Sugar, General), `scheduled_at`, `status` (booked, completed), `notes`.
*   **`events`**: `id`, `name`, `date`, `required_staff_count`, `status`.
*   **`event_assignments`**: `id`, `event_id`, `volunteer_id`, `role`.

## 5. Security Framework
*   **Authentication**: Supabase Auth (Email/Password + Social Providers).
*   **Authorization**: Row Level Security (RLS) policies.
    *   *Public*: Can view Blogs, Events.
    *   *Authenticated*: Can book health checks.
    *   *Medical Staff*: Can view Incident Forms, Patient Records (assigned to them).
    *   *Admin*: Full access.
*   **Data Privacy**: HIPAA/GDPR compliance measures (encryption at rest, strict access logs).

## 6. Implementation Roadmap

### Phase 1: MVP & Emergency (Weeks 1-2)
*   Public Website (Home, About, Services).
*   **WhatsApp Emergency Button Integration**.
*   Emergency Support Page (Static hospital list).

### Phase 2: Volunteer & Workforce (Weeks 3-4)
*   User Authentication.
*   Volunteer Registration Form & Workflow.
*   Workforce Health Check Booking System.

### Phase 3: Operations Dashboard (Weeks 5-6)
*   Incident Reporting Form.
*   Admin Dashboard (Volunteer management, Event assignments).
*   Real-time notifications.

### Phase 4: Automation (Week 7+)
*   Analytics.
*   Advanced WhatsApp API integration (Chatbot).

## 7. UI/UX Guidelines
*   **Palette**:
    *   Primary: `Emerald-600` (Healing, Calm).
    *   Secondary: `Blue-600` (Trust, Professionalism).
    *   Emergency: `Red-600` (Urgency - used sparingly).
    *   Neutral: `Slate-50` to `Slate-900`.
*   **Typography**: Inter (Clean sans-serif).
*   **Accessibility**: WCAG 2.1 AA compliant (high contrast, screen reader friendly).
