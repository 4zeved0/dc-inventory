import React from "react";

interface TermsProps {
  show: boolean;
  onClose: () => void;
}

const Terms: React.FC<TermsProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[900px] h-[600px] bg-white p-10 rounded shadow-lg relative overflow-y-auto">
        <button className="absolute top-3 right-3 text-lg" onClick={onClose}>
          ✖
        </button>
        <h1 className="text-2xl font-bold mb-4">Termos de Cadastro e Proteção de Dados</h1>

        <h2 className="text-xl font-semibold mt-4">1. Introdução</h2>
        <p className="mt-2">Ao se cadastrar em nosso site, você concorda com os termos e condições aqui descritos. Nosso compromisso é garantir a segurança e privacidade de seus dados, conforme as normas vigentes de proteção de dados.</p>

        <h2 className="text-xl font-semibold mt-4">2. Coleta e Uso de Dados</h2>
        <p className="mt-2">Os dados fornecidos no cadastro, como nome, e-mail, telefone e outros, serão utilizados exclusivamente para:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Criar e gerenciar sua conta;</li>
          <li>Melhorar sua experiência em nosso site;</li>
          <li>Enviar comunicações relevantes, caso autorizado;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">3. Armazenamento e Segurança</h2>
        <p className="mt-2">Empregamos medidas de segurança para proteger suas informações contra acessos não autorizados, perda ou alteração. Seus dados são armazenados em servidores seguros e apenas acessíveis por pessoal autorizado.</p>

        <h2 className="text-xl font-semibold mt-4">4. Compartilhamento de Informações</h2>
        <p className="mt-2">Não vendemos, alugamos ou compartilhamos seus dados com terceiros, exceto:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Quando necessário para prestação dos serviços contratados;</li>
          <li>Quando exigido por lei ou autoridades competentes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">5. Direitos do Usuário</h2>
        <p className="mt-2">Você tem o direito de:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Acessar, corrigir ou excluir seus dados pessoais;</li>
          <li>Solicitar informações sobre o uso de seus dados;</li>
          <li>Revogar consentimentos previamente concedidos.</li>
        </ul>
        <p className="mt-2">Para exercer esses direitos, entre em contato conosco pelos canais disponíveis no site.</p>

        <h2 className="text-xl font-semibold mt-4">6. Alterações nos Termos</h2>
        <p className="mt-2">Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos a revisão periódica para se manter informado sobre eventuais atualizações.</p>

        <h2 className="text-xl font-semibold mt-4">7. Contato</h2>
        <p className="mt-2">Caso tenha dúvidas sobre este termo ou sobre a proteção de seus dados, entre em contato conosco através do nosso suporte.</p>

        <p className="mt-4 font-semibold">Ao continuar o cadastro, você confirma que leu e concorda com os termos aqui descritos.</p>
      </div>
    </div>
  );
};

export default Terms;

