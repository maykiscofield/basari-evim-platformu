import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Bireysel koçluk nasıl işliyor?',
    answer: 'Bireysel koçluk programımızda size özel atanan bir koç ile haftalık online görüşmeler yaparsınız. Koçunuz sizin için kişisel bir çalışma planı hazırlar, ilerlemenizi takip eder ve her adımda motivasyonunuzu yüksek tutmanıza yardımcı olur.',
  },
  {
    question: 'Dijital materyallere nasıl erişebilirim?',
    answer: 'Satın aldığınız dijital materyaller anında hesabınıza tanımlanır. Panelinizdeki "Materyallerim" bölümünden tüm içeriklere ulaşabilir, PDF\'leri indirebilir ve video dersleri izleyebilirsiniz.',
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    answer: 'Kredi kartı ve banka kartı ile güvenli ödeme yapabilirsiniz. Koçluk paketleri için aylık abonelik veya tek seferlik ödeme seçeneklerimiz mevcuttur.',
  },
  {
    question: 'İade politikanız nasıl?',
    answer: 'Dijital ürünlerde içeriğe erişim sağlandıktan sonra iade yapılamamaktadır. Koçluk paketlerinde ilk hafta içinde memnun kalmazsanız tam iade garantisi sunuyoruz.',
  },
  {
    question: 'Hangi sınıf seviyelerine hizmet veriyorsunuz?',
    answer: 'Öncelikli olarak 11. ve 12. sınıf öğrencilerine YKS hazırlık hizmeti veriyoruz. Ayrıca mezun öğrenciler için de özel programlarımız bulunmaktadır.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Sıkça Sorulan </span>
            <span className="text-primary font-extrabold inline-block drop-shadow-md">
              Sorular
            </span>
          </h2>
          <p className="text-foreground max-w-2xl mx-auto">
            Merak ettiğiniz her şeyin cevabı burada. Başka sorularınız varsa bizimle iletişime geçin.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
