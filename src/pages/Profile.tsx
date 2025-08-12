import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Layout/Header';
import { ArrowLeft, Save, User } from 'lucide-react';

interface UserProfile {
  name?: string;
  age?: number;
  gender?: string;
  health_goals?: string[];
  medical_conditions?: string;
  communication_style?: string;
  emergency_contact?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, isDemo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user && !isDemo) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      loadProfile();
    }
  }, [user, isDemo, navigate]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error loading profile",
        description: "Could not load your profile information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile,
        });

      if (error) throw error;

      toast({
        title: "Profile saved!",
        description: "Your health profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error saving profile",
        description: "Could not save your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Health Profile</CardTitle>
                  <CardDescription>
                    {isDemo ? 'Demo Mode - Changes won\'t be saved' : 'Personalize your VitalSense experience'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={profile.name || ''}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    disabled={isDemo}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={profile.age || ''}
                    onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                    disabled={isDemo}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={profile.gender || ''}
                  onValueChange={(value) => updateProfile('gender', value)}
                  disabled={isDemo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical-conditions">Medical Conditions</Label>
                <Textarea
                  id="medical-conditions"
                  placeholder="List any medical conditions, allergies, or medications you're taking..."
                  value={profile.medical_conditions || ''}
                  onChange={(e) => updateProfile('medical_conditions', e.target.value)}
                  disabled={isDemo}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input
                  id="emergency-contact"
                  placeholder="Emergency contact name and phone number"
                  value={profile.emergency_contact || ''}
                  onChange={(e) => updateProfile('emergency_contact', e.target.value)}
                  disabled={isDemo}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="communication-style">Communication Style</Label>
                <Select
                  value={profile.communication_style || 'casual'}
                  onValueChange={(value) => updateProfile('communication_style', value)}
                  disabled={isDemo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select communication style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="technical">Technical & Detailed</SelectItem>
                    <SelectItem value="motivational">Motivational & Encouraging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isDemo && (
                <Button
                  onClick={saveProfile}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;