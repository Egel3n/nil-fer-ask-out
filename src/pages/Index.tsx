
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Calendar, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [instagramUsername, setInstagramUsername] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instagramUsername || !proposedDate) {
      toast({
        title: "Eksik bilgiler",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('date_proposals')
        .insert([
          {
            instagram_username: instagramUsername,
            proposed_date: proposedDate,
          },
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Teklif gönderildi! 💕",
        description: "Romantik teklifin kaydedildi!",
      });
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast({
        title: "Bir hata oluştu",
        description: "Tekrar dener misin?",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 relative overflow-hidden">
      {/* Animated floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-400 animate-bounce opacity-70`}
            size={Math.random() * 20 + 15}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {!isSubmitted ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-pink-200">
              {/* Main title with animation */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-pink-600 mb-4 animate-pulse">
                  💕 Benimle Çıkar Mısın Merve? 💕
                </h1>
                <div className="flex justify-center space-x-2 mb-4">
                  <Heart className="text-red-500 animate-bounce" size={24} />
                  <Heart className="text-pink-500 animate-bounce" size={28} style={{ animationDelay: '0.2s' }} />
                  <Heart className="text-red-500 animate-bounce" size={24} style={{ animationDelay: '0.4s' }} />
                </div>
                <p className="text-gray-600 text-lg">
                  Sen çok özelsin ve seninle vakit geçirmek istiyorum 🌹
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-pink-700 font-medium flex items-center gap-2">
                    <Instagram size={18} />
                    Instagram Kullanıcı Adın
                  </Label>
                  <Input
                    id="instagram"
                    type="text"
                    value={instagramUsername}
                    onChange={(e) => setInstagramUsername(e.target.value)}
                    placeholder="@kullanici_adin"
                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-pink-700 font-medium flex items-center gap-2">
                    <Calendar size={18} />
                    İlk Randevumuz Ne Zaman Olsun?
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transform transition-all duration-200 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Heart size={18} />
                      Evet, Randevuya Çıkalım! 💕
                    </div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-pink-200 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-pink-600 mb-4">
                Teşekkürler Merve! 💕
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Cevabın kaydedildi! Çok heyecanlıyım! 🌹
              </p>
              <div className="flex justify-center space-x-2">
                <Heart className="text-red-500 animate-bounce" size={30} />
                <Heart className="text-pink-500 animate-bounce" size={34} style={{ animationDelay: '0.2s' }} />
                <Heart className="text-red-500 animate-bounce" size={30} style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional floating hearts that appear randomly */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
