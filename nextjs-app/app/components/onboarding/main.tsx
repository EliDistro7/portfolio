'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Simamia Wanachama",
      description: "Ongoza na fuatilia wanachama wote wa klabu yako kwa urahisi",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Michango na Mapato",
      description: "Simamia michango ya kila mwezi na pata ripoti za mapato",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Takwimu za Wakati Halisi",
      description: "Ona takwimu za uongozaji wa klabu yako kwa muda halisi",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Usalama wa Hali ya Juu",
      description: "Data yako na ya wanachama iko salama na imehifadhiwa vizuri",
      color: "from-red-500 to-red-600"
    }
  ];

  const steps = [
    {
      title: "Karibu kwenye Mfumo wa Klabu!",
      subtitle: "Mfumo kamili wa kusimamia klabu yako",
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
              <Users className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashibodi ya Klabu
            </h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Simamia wanachama, michango na takwimu za klabu yako kwa urahisi na ufanisi
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Huduma Zetu Kuu",
      subtitle: "Vipengele vya kipekee vya mfumo wetu",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100'}`}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: isAnimating ? 'none' : 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Uko Tayari Kuanza!",
      subtitle: "Hebu tuanze kusimamia klabu yako",
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Tumia Mfumo Sasa!
            </h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Unaweza kuanza kuongeza wanachama, kusimamia michango na kupata takwimu za klabu yako
            </p>
            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Ongeza Wanachama</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Simamia Michango</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Ona Takwimu</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 overflow-y-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-4xl w-full">
          {/* Progress bar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-12' 
                        : 'bg-gray-200 w-8'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {steps[currentStep].title}
              </h1>
              <p className="text-xl text-gray-600">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="mb-12">
              {steps[currentStep].content}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Nyuma
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onComplete}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  Ruka
                </button>
                <button
                  onClick={nextStep}
                  className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{currentStep === steps.length - 1 ? 'Anza Kutumia' : 'Endelea'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;