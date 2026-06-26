export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          cancelled_at: string | null
          cancelled_by: string | null
          cancelled_reason: string | null
          created_at: string | null
          currency: string | null
          duration_minutes: number
          id: string
          is_trial: boolean | null
          platform_commission_rate: number
          price: number
          scheduled_at: string
          status: Database["public"]["Enums"]["booking_status"] | null
          student_id: string
          student_note: string | null
          tutor_id: string
          tutor_note: string | null
          updated_at: string | null
        }
        Insert: {
          cancelled_at?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          currency?: string | null
          duration_minutes?: number
          id?: string
          is_trial?: boolean | null
          platform_commission_rate?: number
          price: number
          scheduled_at: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          student_id: string
          student_note?: string | null
          tutor_id: string
          tutor_note?: string | null
          updated_at?: string | null
        }
        Update: {
          cancelled_at?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          currency?: string | null
          duration_minutes?: number
          id?: string
          is_trial?: boolean | null
          platform_commission_rate?: number
          price?: number
          scheduled_at?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          student_id?: string
          student_note?: string | null
          tutor_id?: string
          tutor_note?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          is_muted: boolean | null
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_muted?: boolean | null
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_muted?: boolean | null
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string | null
          type: Database["public"]["Enums"]["conversation_type"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          type?: Database["public"]["Enums"]["conversation_type"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          type?: Database["public"]["Enums"]["conversation_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          student_id: string
          tutor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          student_id: string
          tutor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          student_id?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          flag_emoji: string | null
          id: string
          is_active: boolean | null
          name_az: string
          name_en: string
          name_ru: string
          sort_order: number | null
        }
        Insert: {
          code: string
          flag_emoji?: string | null
          id?: string
          is_active?: boolean | null
          name_az: string
          name_en: string
          name_ru: string
          sort_order?: number | null
        }
        Update: {
          code?: string
          flag_emoji?: string | null
          id?: string
          is_active?: boolean | null
          name_az?: string
          name_en?: string
          name_ru?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          actual_duration_minutes: number | null
          booking_id: string | null
          created_at: string | null
          currency: string | null
          duration_minutes: number
          ended_at: string | null
          homework: string | null
          id: string
          language_id: string | null
          price: number
          recording_url: string | null
          room_id: string | null
          scheduled_at: string
          shared_notes: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["lesson_status"] | null
          student_id: string
          student_notes: string | null
          topic: string | null
          tutor_id: string
          tutor_notes: string | null
          updated_at: string | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          duration_minutes?: number
          ended_at?: string | null
          homework?: string | null
          id?: string
          language_id?: string | null
          price: number
          recording_url?: string | null
          room_id?: string | null
          scheduled_at: string
          shared_notes?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["lesson_status"] | null
          student_id: string
          student_notes?: string | null
          topic?: string | null
          tutor_id: string
          tutor_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_duration_minutes?: number | null
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          duration_minutes?: number
          ended_at?: string | null
          homework?: string | null
          id?: string
          language_id?: string | null
          price?: number
          recording_url?: string | null
          room_id?: string | null
          scheduled_at?: string
          shared_notes?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["lesson_status"] | null
          student_id?: string
          student_notes?: string | null
          topic?: string | null
          tutor_id?: string
          tutor_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachment_type: string | null
          attachment_url: string | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          is_read: boolean | null
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          attachment_type?: string | null
          attachment_url?: string | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          attachment_type?: string | null
          attachment_url?: string | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_responses: {
        Row: {
          also_speaks: string[] | null
          available_days: string[] | null
          available_times: string[] | null
          budget_max: number | null
          budget_min: number | null
          career_industry: string | null
          career_role: string | null
          career_skills: string[] | null
          converted_to_signup: boolean | null
          country_of_birth: string | null
          created_at: string | null
          free_text: string | null
          future_subjects: string[] | null
          goal: string | null
          goal_achievement_period: string | null
          id: string
          level: string | null
          session_id: string
          specialties: string[] | null
          tutor_style: string[] | null
          user_id: string | null
        }
        Insert: {
          also_speaks?: string[] | null
          available_days?: string[] | null
          available_times?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          career_industry?: string | null
          career_role?: string | null
          career_skills?: string[] | null
          converted_to_signup?: boolean | null
          country_of_birth?: string | null
          created_at?: string | null
          free_text?: string | null
          future_subjects?: string[] | null
          goal?: string | null
          goal_achievement_period?: string | null
          id?: string
          level?: string | null
          session_id: string
          specialties?: string[] | null
          tutor_style?: string[] | null
          user_id?: string | null
        }
        Update: {
          also_speaks?: string[] | null
          available_days?: string[] | null
          available_times?: string[] | null
          budget_max?: number | null
          budget_min?: number | null
          career_industry?: string | null
          career_role?: string | null
          career_skills?: string[] | null
          converted_to_signup?: boolean | null
          country_of_birth?: string | null
          created_at?: string | null
          free_text?: string | null
          future_subjects?: string[] | null
          goal?: string | null
          goal_achievement_period?: string | null
          id?: string
          level?: string | null
          session_id?: string
          specialties?: string[] | null
          tutor_style?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          currency: string | null
          failure_reason: string | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          payriff_order_id: string | null
          payriff_payment_url: string | null
          payriff_transaction_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payriff_order_id?: string | null
          payriff_payment_url?: string | null
          payriff_transaction_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payriff_order_id?: string | null
          payriff_payment_url?: string | null
          payriff_transaction_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          is_online: boolean | null
          last_seen_at: string | null
          phone: string | null
          preferred_language: string | null
          role: Database["public"]["Enums"]["user_role"]
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          is_online?: boolean | null
          last_seen_at?: string | null
          phone?: string | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          is_online?: boolean | null
          last_seen_at?: string | null
          phone?: string | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          description: string | null
          id: string
          lesson_id: string | null
          reason: string
          reported_user_id: string | null
          reporter_id: string
          status: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lesson_id?: string | null
          reason: string
          reported_user_id?: string | null
          reporter_id: string
          status?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lesson_id?: string | null
          reason?: string
          reported_user_id?: string | null
          reporter_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_user_id_fkey"
            columns: ["reported_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          is_visible: boolean | null
          lesson_id: string
          rating: number
          rating_clarity: number | null
          rating_preparation: number | null
          rating_progress: number | null
          rating_reassurance: number | null
          student_id: string
          tutor_id: string
          tutor_response: string | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_visible?: boolean | null
          lesson_id: string
          rating: number
          rating_clarity?: number | null
          rating_preparation?: number | null
          rating_progress?: number | null
          rating_reassurance?: number | null
          student_id: string
          tutor_id: string
          tutor_response?: string | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_visible?: boolean | null
          lesson_id?: string
          rating?: number
          rating_clarity?: number | null
          rating_preparation?: number | null
          rating_progress?: number | null
          rating_reassurance?: number | null
          student_id?: string
          tutor_id?: string
          tutor_response?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_availability: {
        Row: {
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id: string
          is_active: boolean | null
          start_time: string
          tutor_id: string
        }
        Insert: {
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id?: string
          is_active?: boolean | null
          start_time: string
          tutor_id: string
        }
        Update: {
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          end_time?: string
          id?: string
          is_active?: boolean | null
          start_time?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_availability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_payouts: {
        Row: {
          admin_note: string | null
          commission_amount: number
          created_at: string | null
          gross_amount: number
          id: string
          lesson_id: string | null
          net_amount: number
          paid_at: string | null
          status: string
          tutor_id: string
        }
        Insert: {
          admin_note?: string | null
          commission_amount: number
          created_at?: string | null
          gross_amount: number
          id?: string
          lesson_id?: string | null
          net_amount: number
          paid_at?: string | null
          status?: string
          tutor_id: string
        }
        Update: {
          admin_note?: string | null
          commission_amount?: number
          created_at?: string | null
          gross_amount?: number
          id?: string
          lesson_id?: string | null
          net_amount?: number
          paid_at?: string | null
          status?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_payouts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_payouts_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_profiles: {
        Row: {
          about: string | null
          application_status:
            | Database["public"]["Enums"]["tutor_application_status"]
            | null
          approved_at: string | null
          average_rating: number | null
          certificates: string[] | null
          completion_rate: number | null
          created_at: string | null
          currency: string | null
          education: string[] | null
          headline: string | null
          id: string
          instant_booking: boolean | null
          is_accepting_students: boolean | null
          is_featured: boolean | null
          is_professional: boolean | null
          lesson_duration_minutes: number
          price_per_lesson: number
          response_time_minutes: number | null
          specializations: string[] | null
          total_hours: number | null
          total_lessons: number | null
          total_reviews: number | null
          total_students: number | null
          trial_price_per_lesson: number | null
          updated_at: string | null
          user_id: string
          video_intro_url: string | null
          years_experience: number | null
        }
        Insert: {
          about?: string | null
          application_status?:
            | Database["public"]["Enums"]["tutor_application_status"]
            | null
          approved_at?: string | null
          average_rating?: number | null
          certificates?: string[] | null
          completion_rate?: number | null
          created_at?: string | null
          currency?: string | null
          education?: string[] | null
          headline?: string | null
          id?: string
          instant_booking?: boolean | null
          is_accepting_students?: boolean | null
          is_featured?: boolean | null
          is_professional?: boolean | null
          lesson_duration_minutes?: number
          price_per_lesson: number
          response_time_minutes?: number | null
          specializations?: string[] | null
          total_hours?: number | null
          total_lessons?: number | null
          total_reviews?: number | null
          total_students?: number | null
          trial_price_per_lesson?: number | null
          updated_at?: string | null
          user_id: string
          video_intro_url?: string | null
          years_experience?: number | null
        }
        Update: {
          about?: string | null
          application_status?:
            | Database["public"]["Enums"]["tutor_application_status"]
            | null
          approved_at?: string | null
          average_rating?: number | null
          certificates?: string[] | null
          completion_rate?: number | null
          created_at?: string | null
          currency?: string | null
          education?: string[] | null
          headline?: string | null
          id?: string
          instant_booking?: boolean | null
          is_accepting_students?: boolean | null
          is_featured?: boolean | null
          is_professional?: boolean | null
          lesson_duration_minutes?: number
          price_per_lesson?: number
          response_time_minutes?: number | null
          specializations?: string[] | null
          total_hours?: number | null
          total_lessons?: number | null
          total_reviews?: number | null
          total_students?: number | null
          trial_price_per_lesson?: number | null
          updated_at?: string | null
          user_id?: string
          video_intro_url?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_unavailability: {
        Row: {
          created_at: string | null
          date: string
          end_time: string | null
          id: string
          reason: string | null
          start_time: string | null
          tutor_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
          tutor_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_unavailability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_languages: {
        Row: {
          id: string
          is_learning: boolean | null
          is_teaching: boolean | null
          language_id: string
          level: Database["public"]["Enums"]["language_level"]
          user_id: string
        }
        Insert: {
          id?: string
          is_learning?: boolean | null
          is_teaching?: boolean | null
          language_id: string
          level: Database["public"]["Enums"]["language_level"]
          user_id: string
        }
        Update: {
          id?: string
          is_learning?: boolean | null
          is_teaching?: boolean | null
          language_id?: string
          level?: Database["public"]["Enums"]["language_level"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_languages_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_languages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      tutor_search_doc: {
        Args: {
          p_about: string
          p_headline: string
          p_specializations: string[]
        }
        Returns: unknown
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "expired"
      conversation_type: "direct" | "lesson"
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      language_level:
        | "beginner"
        | "elementary"
        | "intermediate"
        | "upper_intermediate"
        | "advanced"
        | "native"
      lesson_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      notification_type:
        | "lesson_reminder"
        | "lesson_cancelled"
        | "new_booking"
        | "new_message"
        | "payment"
        | "review"
        | "system"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      tutor_application_status: "pending" | "approved" | "rejected"
      user_role: "student" | "tutor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "cancelled", "expired"],
      conversation_type: ["direct", "lesson"],
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      language_level: [
        "beginner",
        "elementary",
        "intermediate",
        "upper_intermediate",
        "advanced",
        "native",
      ],
      lesson_status: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      notification_type: [
        "lesson_reminder",
        "lesson_cancelled",
        "new_booking",
        "new_message",
        "payment",
        "review",
        "system",
      ],
      payment_status: ["pending", "completed", "failed", "refunded"],
      tutor_application_status: ["pending", "approved", "rejected"],
      user_role: ["student", "tutor", "admin"],
    },
  },
} as const
