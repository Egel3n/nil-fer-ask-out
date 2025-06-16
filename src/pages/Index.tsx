import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [instagramUsername, setInstagramUsername] = useState("");
  const [proposedDate, setProposedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleYesClick = () => {
    setShowHearts(true);
    setTimeout(() => {
      setShowDialog(true);
    }, 2000); // Show dialog after hearts animation
  };

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
      const { error } = await supabase.from("date_proposals").insert([
        {
          instagram_username: instagramUsername,
          proposed_date: proposedDate,
        },
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      setShowDialog(false);
      toast({
        title: "Teklif gönderildi! 💕",
        description: "Romantik teklifin kaydedildi!",
      });
    } catch (error) {
      console.error("Error submitting proposal:", error);
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
      {/* Background floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400 animate-bounce opacity-30"
            size={Math.random() * 15 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated hearts that appear on "Yes" click */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(30)].map((_, i) => (
            <Heart
              key={`heart-${i}`}
              className="absolute text-red-500 animate-ping"
              size={Math.random() * 30 + 20}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-50px",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "3s",
                transform: `translateY(-${100 + Math.random() * 200}vh)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {!isSubmitted ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-pink-200 text-center">
              <div className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-6 animate-pulse leading-tight">
                  Benimle Bir Sonraki Aşamaya Geçer Misin Nilüfer? 💕
                </h1>
                <div className="flex justify-center space-x-2 mb-6">
                  <Heart className="text-red-500 animate-bounce" size={28} />
                  <Heart
                    className="text-pink-500 animate-bounce"
                    size={32}
                    style={{ animationDelay: "0.2s" }}
                  />
                  <Heart
                    className="text-red-500 animate-bounce"
                    size={28}
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>

              <Button
                onClick={handleYesClick}
                disabled={showHearts}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 text-xl rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Heart className="mr-2" size={24} />
                Evet! 💕
              </Button>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-pink-200 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-4">
                Teşekkürler Nilüfer! 💕
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Cevabın kaydedildi! En kısa zamanda istek atıyorum! 🌹
              </p>
              <div className="flex justify-center space-x-2">
                <Heart className="text-red-500 animate-bounce" size={32} />
                <Heart
                  className="text-pink-500 animate-bounce"
                  size={36}
                  style={{ animationDelay: "0.2s" }}
                />
                <Heart
                  className="text-red-500 animate-bounce"
                  size={32}
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for collecting information */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-pink-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-pink-600 text-center mb-4">
              Harika! 💕
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="instagram"
                className="text-pink-700 font-medium flex items-center gap-2"
              >
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
              <Label
                htmlFor="date"
                className="text-pink-700 font-medium flex items-center gap-2"
              >
                <Calendar size={18} />
                İlk Randevumuz Ne Zaman Olsun?
              </Label>
              <Input
                id="date"
                type="date"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
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
                  Bilgileri Kaydet 💕
                </div>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
